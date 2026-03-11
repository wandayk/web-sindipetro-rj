import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export function Select({
  label,
  options,
  error,
  placeholder = "Selecione...",
  required,
  id,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${selectId}-error`;

  return (
    <div className="w-full">
      <label
        htmlFor={selectId}
        className="block text-[17px] font-semibold text-gray-800 mb-2"
      >
        {label}
        {required && <span className="text-brand-error ml-1">*</span>}
      </label>

      <div className="relative">
        <select
          id={selectId}
          className={`
            w-full px-4 py-4 text-lg rounded-xl border-2
            appearance-none cursor-pointer
            transition-all duration-200
            ${
              error
                ? "border-brand-error bg-brand-error-light focus:border-brand-error focus:ring-4 focus:ring-brand-error/20"
                : "border-gray-300 bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20"
            }
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            outline-none
            min-h-[48px]
            ${className}
          `}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Seta customizada */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {error && (
        <div
          id={errorId}
          className="flex items-start gap-2 mt-2 text-brand-error"
          role="alert"
        >
          <span className="text-lg" aria-hidden="true">
            ⚠️
          </span>
          <span className="text-[15px] font-medium">{error}</span>
        </div>
      )}
    </div>
  );
}
