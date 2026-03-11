"use client";

import React, { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Garante que value tenha o comprimento correto
  const paddedValue = value.padEnd(length, " ");

  const handleChange = (index: number, inputValue: string) => {
    // Aceita apenas números
    const digit = inputValue.replace(/\D/g, "").slice(-1);

    // Atualiza o valor
    const newValue = paddedValue.split("");
    newValue[index] = digit || " ";
    const updatedValue = newValue.join("").trim();

    onChange(updatedValue);

    // Auto-avança para o próximo input se digitou um dígito
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Backspace: limpa o campo atual e volta para o anterior
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValue = paddedValue.split("");
      newValue[index] = " ";
      onChange(newValue.join("").trim());

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    // Setas para navegação
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    const digits = pasteData.slice(0, length);
    onChange(digits);

    // Foca no próximo input vazio ou no último
    const nextIndex = Math.min(digits.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center" role="group" aria-label="Código de verificação">
      {Array.from({ length }).map((_, index) => {
        const digit = paddedValue[index] === " " ? "" : paddedValue[index];
        const isFocused = focusedIndex === index;

        return (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            disabled={disabled}
            className={`
              w-11 h-14 sm:w-[52px] sm:h-16
              text-center text-2xl sm:text-[28px] font-bold
              border-2 rounded-xl
              transition-all duration-200
              ${
                isFocused
                  ? "border-brand-primary ring-4 ring-brand-primary/30"
                  : digit
                    ? "border-brand-accent bg-brand-accent-light"
                    : "border-gray-300 bg-white"
              }
              disabled:bg-gray-100 disabled:cursor-not-allowed
              focus:outline-none
            `}
            aria-label={`Dígito ${index + 1} de ${length}`}
          />
        );
      })}
    </div>
  );
}
