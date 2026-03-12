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
        className="block text-label font-semibold text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-brand-error ml-1">*</span>}
      </label>

      <div className="relative">
        <select
          id={selectId}
          className={`
            w-full px-4 py-3 pr-10
            text-body font-medium
            border-2 rounded-lg
            appearance-none cursor-pointer
            transition-all duration-200
            ${
              error
                ? "border-brand-error focus:border-brand-error focus:ring-4 focus:ring-brand-error-light"
                : "border-gray-300 bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary-light"
            }
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            outline-none
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
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
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
        <p
          id={errorId}
          className="mt-2 text-sm text-brand-error flex items-center gap-1"
          role="alert"
        >
          <span aria-hidden="true">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}
