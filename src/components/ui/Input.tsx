import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  mask?: (value: string) => string;
  required?: boolean;
}

export function Input({
  label,
  error,
  hint,
  mask,
  required,
  id,
  className = "",
  onChange,
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mask) {
      const maskedValue = mask(e.target.value);
      e.target.value = maskedValue;
    }
    onChange?.(e);
  };

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-[17px] font-semibold text-gray-800 mb-2"
      >
        {label}
        {required && <span className="text-brand-error ml-1">*</span>}
      </label>

      {hint && (
        <p id={hintId} className="text-[15px] text-gray-600 mb-2">
          {hint}
        </p>
      )}

      <input
        id={inputId}
        className={`
          w-full px-4 py-4 text-lg rounded-xl border-2
          transition-all duration-200
          ${
            error
              ? "border-brand-error bg-brand-error-light focus:border-brand-error focus:ring-4 focus:ring-brand-error/20"
              : "border-gray-300 bg-white focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20"
          }
          disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
          outline-none
          ${className}
        `}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={
          error ? errorId : hint ? hintId : undefined
        }
        onChange={handleChange}
        {...props}
      />

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
