"use client";

import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { DadosPessoais } from "@/components/steps/DadosPessoais";
import { DadosContato } from "@/components/steps/DadosContato";
import { DadosEndereco } from "@/components/steps/DadosEndereco";
import { DadosProfissionais } from "@/components/steps/DadosProfissionais";
import { Resumo } from "@/components/steps/Resumo";
import { CodigoConfirmacao } from "@/components/steps/CodigoConfirmacao";
import { useFormSteps } from "@/hooks/useFormSteps";

const STEP_TITLES = {
  1: { title: "Dados Pessoais", subtitle: "Informe seus dados pessoais", icon: "👤" },
  2: { title: "Dados de Contato", subtitle: "Como podemos entrar em contato", icon: "📞" },
  3: { title: "Endereço", subtitle: "Onde você mora", icon: "🏠" },
  4: { title: "Dados Profissionais", subtitle: "Informações sobre seu trabalho", icon: "💼" },
  5: { title: "Revisão", subtitle: "Confira seus dados", icon: "📋" },
  6: { title: "Confirmação", subtitle: "Confirme sua identidade", icon: "🔐" },
};

export default function CadastroPage() {
  const {
    currentStep,
    totalSteps,
    formData,
    errors,
    updateField,
    nextStep,
    prevStep,
  } = useFormSteps();

  const stepInfo = STEP_TITLES[currentStep as keyof typeof STEP_TITLES];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Steps integrado */}
      <Header 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        showSteps={true}
      />

      {/* Conteúdo principal com bordas arredondadas no topo (estilo mobile app) */}
      <main className="relative -mt-18 mx-auto max-w-2xl px-4 mb-6">
        <div className="bg-white border-black/10 border rounded-4xl shadow-2xl min-h-[calc(100vh-280px)] pt-8 pb-8  ">
          
          {/* Título da etapa */}
          <div className="text-center mb-4 pb-4 px-4 sm:px-8 pt-8">
            <h2 className="leading-0 text-3xl font-bold text-gray-900">
              {stepInfo.title}
            </h2>
            <p className="text-gray-600 mt-2">{stepInfo.subtitle}</p>
          </div>

          {/* Formulário */}
          <div className="mb-6 px-4 sm:px-8">
            {currentStep === 1 && (
              <DadosPessoais
                data={formData}
                errors={errors}
                onChange={updateField}
              />
            )}

            {currentStep === 2 && (
              <DadosContato
                data={formData}
                errors={errors}
                onChange={updateField}
              />
            )}

            {currentStep === 3 && (
              <DadosEndereco
                data={formData}
                errors={errors}
                onChange={updateField}
              />
            )}

            {currentStep === 4 && (
              <DadosProfissionais
                data={formData}
                errors={errors}
                onChange={updateField}
              />
            )}

            {currentStep === 5 && <Resumo data={formData} />}

            {currentStep === 6 && (
              <CodigoConfirmacao
                data={formData}
                onConfirm={nextStep}
                onBack={prevStep}
              />
            )}

            {currentStep > 6 && (
              <div className="text-center py-12 text-gray-500">
                Etapa {currentStep} em construção...
              </div>
            )}
          </div>

          {/* Botões de navegação - apenas para etapas 1-5 */}
          {currentStep < 6 && (
            <div className="flex flex-col gap-3 mt-8 px-4 sm:px-8">
              <Button
                onClick={nextStep}
                variant={currentStep === 5 ? "success" : "primary"}
                icon={currentStep === 5 ? "🔒" : undefined}
              >
                {currentStep === 5
                  ? "Confirmar dados e assinar"
                  : currentStep === totalSteps
                    ? "Finalizar"
                    : "Próximo"}
              </Button>

              {currentStep > 1 && (
                <Button onClick={prevStep} variant="secondary">
                  Voltar
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
