import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-md mx-auto py-6" aria-label="Progresso do formulário">
      <div className="flex items-center justify-between relative">
        {/* Linha de conexão entre as bolinhas */}
        <div
          className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-0 h-1 bg-brand-accent -translate-y-1/2 -z-10 transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
          aria-hidden="true"
        />

        {steps.map((step) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          const isFuture = step > currentStep;

          return (
            <div
              key={step}
              className="flex flex-col items-center gap-2 relative"
            >
              {/* Bolinha */}
              <div
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full
                  flex items-center justify-center
                  text-sm sm:text-base font-bold
                  transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-brand-accent text-white"
                      : isCurrent
                        ? "bg-brand-primary text-white ring-4 ring-brand-primary/30"
                        : "bg-gray-200 text-gray-500"
                  }
                `}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Etapa ${step} de ${totalSteps}${isCompleted ? " - concluída" : isCurrent ? " - atual" : ""}`}
              >
                {isCompleted ? (
                  <span className="text-xl" aria-hidden="true">
                    ✓
                  </span>
                ) : (
                  <span>{step}</span>
                )}
              </div>

              {/* Label (visível apenas no desktop) */}
              <span
                className={`
                  hidden sm:block text-xs font-medium
                  ${isCurrent ? "text-brand-primary" : "text-gray-500"}
                `}
                aria-hidden="true"
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Indicador textual para acessibilidade */}
      <p className="text-center mt-4 text-sm text-gray-600">
        Etapa {currentStep} de {totalSteps}
      </p>
    </div>
  );
}
