"use client";

import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { maskDate } from "@/lib/masks";
import "react-day-picker/style.css";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
}

export function DateInput({
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder = "DD/MM/AAAA",
  disabled = false,
  maxDate = new Date(),
  minDate,
}: DateInputProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse date from string DD/MM/YYYY
  const parseDate = (dateStr: string): Date | undefined => {
    const cleaned = dateStr.replace(/\D/g, "");
    if (cleaned.length !== 8) return undefined;
    
    const day = parseInt(cleaned.substring(0, 2));
    const month = parseInt(cleaned.substring(2, 4)) - 1;
    const year = parseInt(cleaned.substring(4, 8));
    
    const date = new Date(year, month, day);
    if (date.getDate() === day && date.getMonth() === month && date.getFullYear() === year) {
      return date;
    }
    return undefined;
  };

  // Update selectedDate when value changes
  useEffect(() => {
    const date = parseDate(value);
    if (date) {
      setSelectedDate(date);
    }
  }, [value]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskDate(e.target.value);
    onChange(maskedValue);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formatted = format(date, "dd/MM/yyyy");
      onChange(formatted);
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-label font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-brand-error ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          inputMode="numeric"
          className={`
            w-full px-4 py-3 pr-12
            text-body font-medium
            border-2 rounded-lg
            transition-all duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            ${
              error
                ? "border-brand-error focus:border-brand-error focus:ring-4 focus:ring-brand-error-light"
                : "border-gray-300 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary-light"
            }
            outline-none
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
        />

        {/* Calendar Icon Button */}
        <button
          type="button"
          onClick={() => !disabled && setShowCalendar(!showCalendar)}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-brand-primary transition-colors disabled:opacity-50"
          aria-label="Abrir calendário"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
            <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
            <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
          </svg>
        </button>

        {/* Calendar Dropdown */}
        {showCalendar && (
          <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-4">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              locale={ptBR}
              fromDate={minDate}
              toDate={maxDate}
              className="rdp-custom"
              classNames={{
                month_caption: "text-base font-bold text-brand-primary mb-2",
                day_button: "text-sm p-2 rounded-md hover:bg-brand-primary-light transition-colors",
                selected: "bg-brand-primary text-white hover:bg-brand-primary-hover",
                today: "font-bold border border-brand-primary",
                outside: "text-gray-300",
                disabled: "text-gray-300 line-through",
              }}
            />
          </div>
        )}
      </div>

      {error && (
        <p
          id={`${label}-error`}
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
