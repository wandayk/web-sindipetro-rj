import React from "react";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  name: string;
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  name,
}: RadioGroupProps) {
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className="w-full">
      <label className="block text-[17px] font-semibold text-gray-800 mb-3">
        {label}
        {required && <span className="text-brand-error ml-1">*</span>}
      </label>

      <div
        role="radiogroup"
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className="space-y-3"
      >
        {options.map((option) => {
          const isSelected = value === option.value;
          const inputId = `${name}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={`
                relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer
                transition-all duration-200
                ${
                  isSelected
                    ? "border-brand-primary bg-brand-primary-light"
                    : "border-gray-300 bg-white hover:border-brand-primary/50 hover:bg-gray-50"
                }
                focus-within:ring-4 focus-within:ring-brand-primary/30
                min-h-[58px]
              `}
            >
              {/* Input nativo (visualmente oculto mas funcional) */}
              <input
                type="radio"
                id={inputId}
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
                aria-describedby={
                  option.description ? `${inputId}-description` : undefined
                }
              />

              {/* Visual customizado do radio */}
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    transition-all duration-200
                    ${
                      isSelected
                        ? "border-brand-primary bg-brand-primary"
                        : "border-gray-400 bg-white"
                    }
                  `}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
              </div>

              {/* Conteúdo: Label e descrição */}
              <div className="flex-1 min-w-0">
                <span
                  className={`
                    block text-[17px] font-semibold
                    ${isSelected ? "text-brand-primary" : "text-gray-900"}
                  `}
                >
                  {option.label}
                </span>
                {option.description && (
                  <span
                    id={`${inputId}-description`}
                    className="block text-sm text-gray-600 mt-1"
                  >
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-sm text-brand-error flex items-center gap-1"
        >
          <span aria-hidden="true">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}
