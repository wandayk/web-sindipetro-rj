import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success";
  loading?: boolean;
  icon?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  loading = false,
  icon,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = `
    w-full min-h-[58px] px-6 py-4
    text-lg font-bold rounded-xl
    transition-all duration-200
    flex items-center justify-center gap-3
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-4
  `;

  const variantStyles = {
    primary: `
      bg-brand-primary text-white
      hover:bg-brand-primary-hover
      focus:ring-brand-primary/30
      disabled:hover:bg-brand-primary
    `,
    secondary: `
      bg-white text-brand-primary border-2 border-brand-primary
      hover:bg-brand-primary-light
      focus:ring-brand-primary/30
      disabled:hover:bg-white
    `,
    success: `
      bg-brand-accent text-white
      hover:bg-[#0c7450]
      focus:ring-brand-accent/30
      disabled:hover:bg-brand-accent
    `,
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span>Aguarde...</span>
      ) : (
        <>
          {icon && (
            <span className="text-2xl" aria-hidden="true">
              {icon}
            </span>
          )}
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
