# Sistema de Filiação Sindical Online

Plataforma web para cadastro de filiação sindical com assinatura eletrônica, desenvolvida com foco em acessibilidade para público idoso.

## Sobre o Projeto

Este é um protótipo funcional de um sistema de filiação sindical 100% online, que permite que trabalhadores se filiem ao sindicato sem necessidade de impressão, scanner ou deslocamento presencial. O sistema utiliza assinatura eletrônica simples conforme a **Lei nº 14.063/2020**.

### Principais Características

- **Formulário multi-step** com 6 etapas intuitivas
- **Assinatura eletrônica** via código OTP enviado por WhatsApp
- **Auto-preenchimento de endereço** através da API ViaCEP
- **Design acessível** com tamanhos de fonte maiores e contraste adequado
- **Totalmente responsivo** e mobile-first
- **Validação robusta** com Zod em todas as etapas
- **UX otimizada** para usuários com dificuldades tecnológicas

## Stack Tecnológica

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Zod** para validação de formulários
- **Google Fonts** (Source Sans 3 e Libre Baskerville)

## Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ e npm instalados

### Instalação

```bash
# Clone o repositório
git clone <repository-url>

# Entre na pasta do projeto
cd web-sindipetro-rj

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Fluxo do Usuário

O sistema guia o usuário através de 6 etapas:

### 1. Dados Pessoais
- Nome completo, CPF (com validação), RG
- Data de nascimento, sexo, estado civil
- Validação em tempo real com feedback visual

### 2. Dados de Contato
- Telefone, WhatsApp, e-mail
- Máscaras automáticas para telefones
- Validação de formato de e-mail

### 3. Endereço
- CEP com busca automática na API ViaCEP
- Auto-preenchimento de logradouro, bairro, cidade e estado
- Campos editáveis após preenchimento automático

### 4. Dados Profissionais
- Nome da empresa, CNPJ, cargo, data de admissão
- Validação de CNPJ com 14 dígitos

### 5. Revisão
- Visualização de todos os dados preenchidos
- Organizados por seção com formatação amigável
- Alerta antes de prosseguir para assinatura

### 6. Código de Confirmação
- Envio de código OTP de 6 dígitos (mock)
- Timer de 5 minutos para reenvio
- Input otimizado com auto-avanço entre dígitos
- Informações sobre a Lei 14.063/2020

### Tela de Sucesso
- Confirmação do cadastro
- Código de verificação gerado
- Evidências da assinatura eletrônica
- Próximos passos explicados

## Acessibilidade

O projeto foi desenvolvido com **acessibilidade em primeiro lugar**:

- ✅ Tamanho de fonte base de 18px
- ✅ Contraste mínimo WCAG AA (4.5:1)
- ✅ Labels associados a todos os inputs
- ✅ Atributos ARIA completos (aria-required, aria-invalid, aria-describedby)
- ✅ Focus ring visível em todos elementos interativos
- ✅ Tab order lógico
- ✅ Linguagem clara sem termos técnicos
- ✅ Ícones emoji para facilitar compreensão
- ✅ Mensagens de erro descritivas e amigáveis

## Lei 14.063/2020 - Assinatura Eletrônica

O sistema implementa **assinatura eletrônica simples** conforme a Lei nº 14.063/2020, que permite a assinatura de documentos através de validação de identidade por meio eletrônico (código OTP enviado ao celular do usuário).

### Evidências Registradas
- CPF validado
- Telefone confirmado via OTP
- Data e hora da assinatura
- Código de verificação único

## Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout global com fonts
│   ├── page.tsx            # Landing page
│   └── cadastro/
│       ├── page.tsx        # Formulário multi-step
│       └── sucesso/
│           └── page.tsx    # Tela de sucesso
├── components/
│   ├── ui/                 # Componentes base reutilizáveis
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Button.tsx
│   │   ├── StepIndicator.tsx
│   │   └── OtpInput.tsx
│   ├── steps/              # Componentes de cada etapa
│   │   ├── DadosPessoais.tsx
│   │   ├── DadosContato.tsx
│   │   ├── DadosEndereco.tsx
│   │   ├── DadosProfissionais.tsx
│   │   ├── Resumo.tsx
│   │   └── CodigoConfirmacao.tsx
│   └── layout/
│       └── Header.tsx
├── lib/
│   ├── validators.ts       # Schemas Zod
│   ├── masks.ts            # Funções de máscara
│   └── api.ts              # Integração ViaCEP
├── hooks/
│   ├── useFormSteps.ts     # Gerenciamento do multi-step
│   └── useOtp.ts           # Gerenciamento do OTP
└── types/
    └── associate.ts        # Tipos TypeScript
```

## Funcionalidades Mock

Por se tratar de um protótipo, algumas funcionalidades são simuladas:

- ✅ **Envio de OTP**: Simulado com setTimeout (1.5s)
- ✅ **Verificação de OTP**: Aceita qualquer código de 6 dígitos
- ✅ **Submissão final**: Dados apenas logados no console

## Próximos Passos

Para evolução do sistema para produção:

1. **Integração com backend**
   - API REST ou GraphQL para persistência de dados
   - Envio real de SMS/WhatsApp via Twilio ou similar
   - Armazenamento seguro de dados sensíveis

2. **Painel administrativo**
   - Dashboard para visualização de filiações
   - Aprovação/rejeição de cadastros
   - Gestão de associados

3. **Melhorias de segurança**
   - Implementar CAPTCHA
   - Rate limiting nas APIs
   - Criptografia de dados sensíveis

4. **Notificações**
   - E-mails transacionais
   - WhatsApp Business API
   - Notificações push

5. **Testes**
   - Testes unitários com Vitest
   - Testes E2E com Playwright
   - Testes de acessibilidade automatizados

## Licença

Este projeto foi desenvolvido como protótipo funcional.

---

**Desenvolvido com foco em acessibilidade e experiência do usuário.**
