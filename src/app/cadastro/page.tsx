"use client";

import { StepIndicator } from "@/components/ui/StepIndicator";
import { Button } from "@/components/ui/Button";
import { DadosPessoais } from "@/components/steps/DadosPessoais";
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
      {/* Header */}
      <header className="bg-brand-primary text-white py-6 shadow-md">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-center">
            Sindicato dos Trabalhadores
          </h1>
          <p className="text-brand-primary-light text-center mt-1 text-lg">
            Filiação Online
          </p>
        </div>
      </header>

      {/* Indicador de progresso */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-2xl px-4">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Título da etapa */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3" aria-hidden="true">
            {stepInfo.icon}
          </div>
          <h2 className="text-heading font-display font-bold text-gray-900">
            {stepInfo.title}
          </h2>
          <p className="text-gray-600 mt-2">{stepInfo.subtitle}</p>
        </div>

        {/* Card do formulário */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          {currentStep === 1 && (
            <DadosPessoais
              data={formData}
              errors={errors}
              onChange={updateField}
            />
          )}

          {currentStep > 1 && (
            <div className="text-center py-12 text-gray-500">
              Etapa {currentStep} em construção...
            </div>
          )}
        </div>

        {/* Botões de navegação */}
        <div className="flex flex-col gap-3">
          <Button onClick={nextStep} variant="primary">
            {currentStep === totalSteps ? "Finalizar" : "Próximo"}
          </Button>

          {currentStep > 1 && (
            <Button onClick={prevStep} variant="secondary">
              Voltar
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
