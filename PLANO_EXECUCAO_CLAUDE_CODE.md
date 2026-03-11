# PLANO DE EXECUÇÃO — Página de Cadastro de Filiação Sindical
## Para execução via Claude Code — Cronograma de Commits

---

## CONTEXTO

Este plano cobre APENAS a página pública de cadastro do associado.
É um formulário multi-step com assinatura eletrônica simples (OTP).
O público-alvo são trabalhadores, em sua maioria idosos com dificuldade tecnológica.
A prioridade absoluta é acessibilidade e simplicidade.

**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Zod
**Resultado final:** Protótipo funcional navegável, pronto para conectar a APIs futuramente.

---

## COMMIT 1 — Setup do projeto

**Mensagem:** `chore: setup projeto next.js com typescript e tailwind`

**O que fazer:**
1. Criar projeto Next.js com App Router e TypeScript:
   ```bash
   npx create-next-app@14 web-cadastro --typescript --tailwind --app --src-dir --use-pnpm
   ```
2. Instalar dependências:
   ```bash
   pnpm add zod react-hook-form @hookform/resolvers
   ```
3. Configurar `tailwind.config.ts` com tema customizado para acessibilidade:
   ```typescript
   // Adicionar ao theme.extend:
   fontSize: {
     'body': '18px',       // Mínimo para idosos
     'label': '16px',
     'heading': '28px',
     'button': '18px',
   },
   colors: {
     brand: {
       primary: '#1A56A8',
       'primary-hover': '#14437F',
       'primary-light': '#E8F0FE',
       accent: '#0E8A5F',
       'accent-light': '#E6F6EF',
       error: '#C23B22',
       'error-light': '#FDECEA',
       warning: '#B8860B',
       'warning-light': '#FFF8E1',
     }
   },
   ```
4. Configurar `globals.css`:
   - Font padrão: Source Sans 3 (importar do Google Fonts no layout.tsx)
   - Font display: Libre Baskerville (para títulos)
   - Tamanho base: 18px
   - Contraste mínimo WCAG AA (4.5:1)
5. Limpar boilerplate do Next.js (remover conteúdo padrão da page.tsx)
6. Criar estrutura de pastas:
   ```
   src/
   ├── app/
   │   ├── layout.tsx          # Layout global com fonts e meta tags
   │   ├── page.tsx            # Redirect para /cadastro
   │   └── cadastro/
   │       └── page.tsx        # Página principal do formulário
   ├── components/
   │   ├── ui/                 # Componentes base reutilizáveis
   │   ├── steps/              # Componentes de cada etapa do formulário
   │   └── layout/             # Header, footer
   ├── lib/
   │   ├── validators.ts       # Schemas Zod
   │   ├── masks.ts            # Funções de máscara
   │   └── api.ts              # Fetch wrapper (mock por enquanto)
   ├── hooks/                  # Custom hooks
   └── types/                  # Tipos TypeScript
   ```

**Critério de conclusão:** `pnpm dev` roda sem erros, página em branco com layout base.

---

## COMMIT 2 — Componentes UI base (acessibilidade)

**Mensagem:** `feat: componentes UI base com foco em acessibilidade`

**O que fazer:**
1. Criar `src/components/ui/Input.tsx`:
   - Label com fontSize 17px, fontWeight 600
   - Input com padding 16px, fontSize 18px, borderRadius 12px
   - Borda 2px, focus ring visível (3px box-shadow azul)
   - Mensagem de erro em vermelho com ícone
   - Hint text opcional (texto de ajuda abaixo do label)
   - Prop `mask` para aceitar função de máscara
   - Prop `disabled` com visual diferenciado (fundo cinza)
   - Indicador de campo obrigatório (asterisco vermelho)
   - Tudo com aria-labels e aria-describedby corretos

2. Criar `src/components/ui/Select.tsx`:
   - Mesmo padrão visual do Input
   - Seta customizada (SVG inline, não depender do browser)
   - Opção placeholder "Selecione..."
   - Tamanho de toque mínimo 48px

3. Criar `src/components/ui/Button.tsx`:
   - Variantes: primary (azul), secondary (outline), success (verde)
   - Altura mínima 58px, largura 100%
   - Texto 18px bold
   - Suporte a ícone (emoji à esquerda)
   - Estado disabled com opacidade 0.5
   - Estado loading com texto "Aguarde..."
   - Hover com cor mais escura (não usar apenas opacity)

4. Criar `src/components/ui/StepIndicator.tsx`:
   - Bolinhas numeradas (1-6) conectadas por barras
   - Etapa concluída: bolinha verde com ✓
   - Etapa atual: bolinha azul preenchida
   - Etapa futura: bolinha cinza
   - Responsivo (bolinhas menores em telas pequenas)

**Critério de conclusão:** Componentes renderizam corretamente isolados, sem erros de tipagem.

---

## COMMIT 3 — Máscaras e validações

**Mensagem:** `feat: funções de máscara e schemas de validação zod`

**O que fazer:**
1. Criar `src/lib/masks.ts` com funções puras:
   ```typescript
   export function maskCPF(value: string): string
   // 000.000.000-00 — limitar a 11 dígitos

   export function maskPhone(value: string): string
   // (00) 00000-0000 — aceitar 10 ou 11 dígitos

   export function maskCEP(value: string): string
   // 00000-000 — limitar a 8 dígitos

   export function maskCNPJ(value: string): string
   // 00.000.000/0000-00 — limitar a 14 dígitos

   export function maskDate(value: string): string
   // DD/MM/AAAA — limitar a 8 dígitos
   ```

2. Criar `src/lib/validators.ts` com:
   ```typescript
   // Função de validação de CPF (algoritmo completo com dígitos verificadores)
   export function isValidCPF(cpf: string): boolean

   // Schemas Zod para cada etapa:
   export const personalDataSchema = z.object({
     fullName: z.string().min(3, "Informe seu nome completo"),
     cpf: z.string().refine(isValidCPF, "CPF inválido"),
     rg: z.string().min(1, "Informe seu RG"),
     birthDate: z.string() com validação DD/MM/AAAA,
     gender: z.enum(["M", "F", "OTHER"], "Selecione o sexo"),
     maritalStatus: z.string().min(1, "Selecione o estado civil"),
   })

   export const contactDataSchema = z.object({
     phone: z.string() com validação 10-11 dígitos,
     whatsapp: z.string() com validação 10-11 dígitos,
     email: z.string().email("Informe um e-mail válido"),
   })

   export const addressDataSchema = z.object({
     cep: z.string() com validação 8 dígitos,
     street: z.string().min(1),
     number: z.string().min(1),
     complement: z.string().optional(),
     neighborhood: z.string().min(1),
     city: z.string().min(1),
     state: z.string().length(2),
   })

   export const professionalDataSchema = z.object({
     companyName: z.string().min(1),
     companyCnpj: z.string() com validação 14 dígitos,
     jobTitle: z.string().min(1),
     admissionDate: z.string() com validação DD/MM/AAAA,
   })
   ```

3. Criar `src/types/associate.ts`:
   ```typescript
   export interface AssociateFormData {
     // Todos os campos do formulário tipados
     fullName: string
     cpf: string
     rg: string
     birthDate: string
     gender: 'M' | 'F' | 'OTHER'
     maritalStatus: string
     phone: string
     whatsapp: string
     email: string
     cep: string
     street: string
     number: string
     complement: string
     neighborhood: string
     city: string
     state: string
     companyName: string
     companyCnpj: string
     jobTitle: string
     admissionDate: string
   }
   ```

**Critério de conclusão:** Testes manuais de cada máscara e validação via console/playground.

---

## COMMIT 4 — Etapa 1: Dados Pessoais

**Mensagem:** `feat: etapa 1 do formulário - dados pessoais`

**O que fazer:**
1. Criar `src/components/steps/DadosPessoais.tsx`:
   - Campos: Nome completo, CPF (com máscara), RG, Data de nascimento (com máscara), Sexo (select), Estado civil (select)
   - Usar componentes UI do commit 2
   - Validação ao clicar "Próximo" usando schema Zod
   - Erros aparecem inline abaixo de cada campo
   - Opções de sexo: Masculino, Feminino, Outro
   - Opções de estado civil: Solteiro(a), Casado(a), Divorciado(a), Viúvo(a), União Estável

2. Criar `src/hooks/useFormSteps.ts`:
   - Hook que gerencia: step atual, dados de todas as etapas, navegação (next/prev), validação por etapa
   - Estado global do formulário (todos os campos)
   - Função `updateField(field, value)` que atualiza um campo e limpa o erro dele
   - Função `validateCurrentStep()` que roda o schema Zod da etapa atual
   - Função `nextStep()` que valida antes de avançar
   - Função `prevStep()` que volta sem validar

3. Montar a `src/app/cadastro/page.tsx`:
   - Header com nome do sindicato (azul)
   - StepIndicator mostrando progresso
   - Título da etapa com ícone e subtítulo
   - Card branco com o conteúdo da etapa
   - Botões de navegação abaixo do card
   - Layout mobile-first (max-width 560px, centralizado)

**Critério de conclusão:** Etapa 1 renderiza, valida campos, mostra erros, botão "Próximo" só avança se válido.

---

## COMMIT 5 — Etapas 2 e 3: Contato e Endereço

**Mensagem:** `feat: etapas 2 (contato) e 3 (endereço) com auto-preenchimento CEP`

**O que fazer:**
1. Criar `src/components/steps/DadosContato.tsx`:
   - Campos: Telefone (máscara), WhatsApp (máscara), E-mail
   - Hint no WhatsApp: "Número que você usa no WhatsApp"

2. Criar `src/components/steps/DadosEndereco.tsx`:
   - Campo CEP com máscara
   - Ao digitar 8 dígitos no CEP: chamar ViaCEP para auto-preencher
   - URL: `https://viacep.com.br/ws/{cep}/json/`
   - Enquanto carrega: mostrar "Buscando endereço..." e desabilitar campos de endereço
   - Se CEP inválido na API: mostrar erro "CEP não encontrado"
   - Campos: Rua (auto-preenchido), Número, Complemento (opcional), Bairro (auto-preenchido), Cidade (auto-preenchido), Estado (auto-preenchido, select com todos os UFs)
   - Número e Complemento lado a lado (grid 2 colunas)
   - Cidade e Estado lado a lado (grid 2:1)

3. Criar `src/lib/api.ts`:
   ```typescript
   export async function fetchAddress(cep: string): Promise<{
     street: string
     neighborhood: string
     city: string
     state: string
   } | null>
   // Chama ViaCEP, retorna null se erro
   ```

4. Integrar ambas as etapas na page.tsx com navegação funcional.

**Critério de conclusão:** Navegação funciona entre etapas 1→2→3, CEP auto-preenche endereço real, validação funciona.

---

## COMMIT 6 — Etapa 4: Dados Profissionais

**Mensagem:** `feat: etapa 4 - dados profissionais`

**O que fazer:**
1. Criar `src/components/steps/DadosProfissionais.tsx`:
   - Campos: Nome da empresa, CNPJ da empresa (máscara), Cargo/Função, Data de admissão (máscara DD/MM/AAAA)
   - Validação: todos obrigatórios, CNPJ com 14 dígitos, data válida

2. Integrar na navegação (etapas 1→2→3→4).

**Critério de conclusão:** Etapa 4 funcional com validação, navegação completa até aqui.

---

## COMMIT 7 — Etapa 5: Tela de Revisão

**Mensagem:** `feat: etapa 5 - revisão dos dados antes da assinatura`

**O que fazer:**
1. Criar `src/components/steps/Resumo.tsx`:
   - Exibe TODOS os dados preenchidos agrupados por seção:
     - Dados Pessoais (nome, CPF, RG, nascimento, sexo, estado civil)
     - Contato (telefone, WhatsApp, e-mail)
     - Endereço (CEP, rua + número + complemento, bairro, cidade/UF)
     - Dados Profissionais (empresa, CNPJ, cargo, admissão)
   - Cada seção com título azul e separador
   - Dados em formato: label à esquerda, valor à direita em negrito
   - Caixa amarela de alerta no final:
     "Confira todos os dados antes de continuar. Na próxima etapa, você receberá um código de confirmação no seu celular."
   - Botão de ação: "Confirmar dados e assinar" (verde, com ícone de cadeado)
   - Botão voltar disponível

2. Tratar exibição amigável:
   - Gender "M" → "Masculino", "F" → "Feminino", "OTHER" → "Outro"
   - MaritalStatus com labels legíveis
   - Endereço concatenado: "Rua X, 123 - Apto 4"

**Critério de conclusão:** Tela de revisão mostra todos os dados corretamente, botão avança para etapa 6.

---

## COMMIT 8 — Etapa 6: Código OTP e Assinatura

**Mensagem:** `feat: etapa 6 - envio e verificação de código OTP com assinatura eletrônica`

**O que fazer:**
1. Criar `src/components/ui/OtpInput.tsx`:
   - 6 inputs individuais lado a lado
   - Cada input aceita apenas 1 dígito numérico
   - Auto-avança para o próximo ao digitar
   - Backspace volta para o anterior
   - fontSize 28px, largura 52px, altura 64px cada
   - Focus ring visível
   - inputMode="numeric" para teclado numérico no mobile

2. Criar `src/components/steps/CodigoConfirmacao.tsx` com dois estados:
   
   **Estado 1 — Antes de enviar o código:**
   - Ícone grande de celular (📱)
   - Texto: "Vamos enviar um código de confirmação"
   - Texto: "Enviaremos um código de 6 números para o seu WhatsApp (XX) XXXXX-XXXX"
   - Botão: "Enviar código" (azul)
   - Botão: "Voltar e revisar dados" (outline)
   
   **Estado 2 — Após enviar o código:**
   - Texto: "Digite o código recebido"
   - Texto: "Enviamos para (XX) XXXXX-XXXX"
   - Componente OtpInput
   - Botão: "Confirmar e Assinar" (verde, desabilitado até 6 dígitos)
   - Timer de reenvio: "Reenviar código em X:XX" (5 minutos)
   - Após timer zerar: link "Reenviar código" clicável
   - Caixa informativa azul clara:
     "Ao confirmar, você assina eletronicamente sua ficha de filiação sindical nos termos da Lei nº 14.063/2020 (Assinatura Eletrônica Simples)."

3. Criar `src/hooks/useOtp.ts`:
   ```typescript
   // Hook que gerencia:
   // - otpSent: boolean (código foi enviado?)
   // - otpValue: string (6 dígitos digitados)
   // - timer: number (countdown em segundos, inicia em 300 = 5 min)
   // - loading: boolean
   // - sendOtp(): simula envio (setTimeout 1.5s)
   // - verifyOtp(): simula verificação (setTimeout 2s, aceita qualquer código de 6 dígitos)
   // - resendOtp(): reenvia e reseta timer
   ```

4. Todos os envios e verificações são MOCK por enquanto (setTimeout simulando latência).

**Critério de conclusão:** Fluxo completo: enviar código → digitar 6 dígitos → confirmar → avança para tela de sucesso.

---

## COMMIT 9 — Tela de Sucesso

**Mensagem:** `feat: tela de sucesso pós-assinatura com dados de evidência`

**O que fazer:**
1. Criar `src/app/cadastro/sucesso/page.tsx` ou estado final no componente:
   - Ícone grande de sucesso (✅) em círculo verde
   - Título: "Cadastro Recebido!"
   - Texto: "Seus dados foram recebidos com sucesso. O sindicato entrará em contato com a sua empresa para confirmar a filiação."
   - Card verde claro: "Você receberá atualizações por WhatsApp no número (XX) XXXXX-XXXX"
   - Card azul claro com dados da assinatura:
     - "Assinatura Eletrônica Registrada"
     - "Documento assinado em conformidade com a Lei nº 14.063/2020"
     - "Evidências registradas: CPF, telefone validado, data/hora e código de verificação"
     - Código fictício: "SND-2026-XXXXXXXX" (gerado aleatoriamente)

**Critério de conclusão:** Tela de sucesso exibida após OTP, visual limpo e informativo.

---

## COMMIT 10 — Layout, Header e responsividade final

**Mensagem:** `feat: layout responsivo, header do sindicato e ajustes finais de UX`

**O que fazer:**
1. Refinar `src/app/layout.tsx`:
   - Meta tags (viewport, charset, description, theme-color)
   - Favicon (pode ser emoji ou placeholder)
   - Fonts carregadas via next/font ou link do Google Fonts

2. Criar `src/components/layout/Header.tsx`:
   - Fundo azul (brand-primary)
   - Nome: "Sindicato dos Trabalhadores" (Libre Baskerville, branco)
   - Subtítulo: "Filiação Online" (Source Sans 3, azul claro)
   - Fixo no topo? Não — scroll normal para não reduzir área útil no mobile

3. Ajustes de responsividade:
   - Testar em viewport 375px (iPhone SE) — tudo deve caber sem scroll horizontal
   - Grids de 2 colunas (Número/Complemento, Cidade/Estado) devem colapsar para 1 coluna em telas < 400px
   - Botões sempre 100% de largura
   - OTP inputs um pouco menores em telas pequenas (44px x 54px)
   - StepIndicator com bolinhas menores em mobile

4. Acessibilidade final:
   - Verificar que todos os inputs têm labels associados (htmlFor + id)
   - Verificar aria-required, aria-invalid nos campos com erro
   - Cores de erro passam contraste WCAG AA
   - Tab order lógico (campos na ordem natural)
   - Sem termos técnicos visíveis ao usuário em nenhum lugar

**Critério de conclusão:** Protótipo completo, responsivo, navegável do início ao fim sem erros.

---

## COMMIT 11 — Página de apresentação e README

**Mensagem:** `docs: README com instruções e documentação do protótipo`

**O que fazer:**
1. Criar `README.md` com:
   - Título do projeto
   - Descrição breve
   - Stack utilizada
   - Como rodar (`pnpm install && pnpm dev`)
   - Screenshots ou descrição das telas
   - Fluxo do usuário (6 etapas)
   - Nota sobre a Lei 14.063/2020
   - Nota sobre acessibilidade (público idoso)
   - Próximos passos (integração com APIs, painel admin)

2. Criar `src/app/page.tsx` como landing page simples:
   - Título: "Filie-se ao Sindicato"
   - Subtítulo: "Preencha seu cadastro online em poucos minutos"
   - Botão grande: "Iniciar Cadastro" → redireciona para /cadastro
   - Informações: "Sem impressão, sem scanner, sem complicação"
   - Visual limpo, uma única ação clara

**Critério de conclusão:** Projeto completo com documentação, pronto para apresentação.

---

## RESUMO DOS COMMITS

| # | Mensagem | Escopo |
|---|----------|--------|
| 1 | `chore: setup projeto next.js com typescript e tailwind` | Estrutura, config, pastas |
| 2 | `feat: componentes UI base com foco em acessibilidade` | Input, Select, Button, StepIndicator |
| 3 | `feat: funções de máscara e schemas de validação zod` | Máscaras, CPF, Zod schemas, tipos |
| 4 | `feat: etapa 1 do formulário - dados pessoais` | Step 1, hook useFormSteps, page base |
| 5 | `feat: etapas 2 (contato) e 3 (endereço) com auto-preenchimento CEP` | Steps 2-3, ViaCEP, api.ts |
| 6 | `feat: etapa 4 - dados profissionais` | Step 4 |
| 7 | `feat: etapa 5 - revisão dos dados antes da assinatura` | Step 5, resumo completo |
| 8 | `feat: etapa 6 - envio e verificação de código OTP com assinatura eletrônica` | OTP input, hook, mock, Lei 14.063 |
| 9 | `feat: tela de sucesso pós-assinatura com dados de evidência` | Tela final, código de verificação |
| 10 | `feat: layout responsivo, header do sindicato e ajustes finais de UX` | Responsividade, a11y, header |
| 11 | `docs: README com instruções e documentação do protótipo` | README, landing page |

---

## REGRAS PARA O CLAUDE CODE

1. **Executar commit a commit, na ordem.** Não pular etapas.
2. **Cada commit deve compilar sem erros** (`pnpm build` ou no mínimo `pnpm dev` sem crash).
3. **Não instalar dependências além das listadas.** Stack enxuta.
4. **Toda string visível ao usuário deve estar em português brasileiro.**
5. **Zero termos técnicos na interface.** "OTP" nunca aparece na tela. "Token" nunca aparece. Usar: "código de confirmação", "verificação", "próximo", "enviar".
6. **Mobile-first.** Desenvolver primeiro para tela de 375px, depois ajustar para desktop.
7. **Não criar backend.** Todo envio de dados é mock (console.log ou setTimeout simulando API).
8. **Commitar com as mensagens exatas da tabela acima.**
9. **Ao finalizar cada commit:** rodar `pnpm dev`, confirmar que funciona, só então commitar e seguir para o próximo.