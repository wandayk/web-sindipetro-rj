"use client";

import { useState } from "react";
import { z } from "zod";
import { AssociateFormData } from "@/types/associate";
import {
  personalDataSchema,
  contactDataSchema,
  addressDataSchema,
  professionalDataSchema,
} from "@/lib/validators";

const TOTAL_STEPS = 6;

// Schema para cada etapa
const stepSchemas = {
  1: personalDataSchema,
  2: contactDataSchema,
  3: addressDataSchema,
  4: professionalDataSchema,
  5: z.object({}), // Etapa de revisão, sem validação
  6: z.object({}), // Etapa de OTP, sem validação aqui
};

export function useFormSteps() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AssociateFormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Atualiza um campo específico e limpa o erro dele
  const updateField = (field: keyof AssociateFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Valida a etapa atual
  const validateCurrentStep = (): boolean => {
    const schema = stepSchemas[currentStep as keyof typeof stepSchemas];

    if (!schema) {
      return true; // Etapas sem validação passam automaticamente
    }

    try {
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path && err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error("Erro de validação:", error);
      }
      return false;
    }
  };

  // Avança para a próxima etapa (com validação)
  const nextStep = (): boolean => {
    if (!validateCurrentStep()) {
      return false;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return true;
  };

  // Volta para a etapa anterior (sem validação)
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Vai para uma etapa específica (sem validação)
  const goToStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    formData,
    errors,
    updateField,
    validateCurrentStep,
    nextStep,
    prevStep,
    goToStep,
    setFormData,
  };
}
