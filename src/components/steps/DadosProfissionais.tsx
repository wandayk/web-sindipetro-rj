"use client";

import React from "react";
import { Input } from "../ui/Input";
import { maskDate } from "@/lib/masks";
import { AssociateFormData } from "@/types/associate";

interface DadosProfissionaisProps {
  data: Partial<AssociateFormData>;
  errors: Record<string, string>;
  onChange: (field: keyof AssociateFormData, value: string) => void;
}

export function DadosProfissionais({
  data,
  errors,
  onChange,
}: DadosProfissionaisProps) {
  return (
    <div className="space-y-5">
      <Input
        label="Empresa"
        required
        value={data.company || ""}
        onChange={(e) => onChange("company", e.target.value)}
        error={errors.company}
        placeholder="Digite o nome da empresa"
        autoComplete="organization"
      />

      <Input
        label="Lotação"
        required
        value={data.allocation || ""}
        onChange={(e) => onChange("allocation", e.target.value)}
        error={errors.allocation}
        placeholder="Digite a lotação"
        autoComplete="off"
      />

      <Input
        label="Prédio/Unidade"
        required
        value={data.building || ""}
        onChange={(e) => onChange("building", e.target.value)}
        error={errors.building}
        placeholder="Digite o prédio ou unidade"
        autoComplete="off"
      />

      <Input
        label="Matrícula"
        required
        value={data.registration || ""}
        onChange={(e) => onChange("registration", e.target.value)}
        error={errors.registration}
        placeholder="Digite sua matrícula"
        inputMode="numeric"
        autoComplete="off"
      />

      <Input
        label="Data de admissão"
        required
        value={data.admissionDate || ""}
        onChange={(e) => onChange("admissionDate", e.target.value)}
        error={errors.admissionDate}
        mask={maskDate}
        placeholder="DD/MM/AAAA"
        inputMode="numeric"
        autoComplete="off"
      />

      <Input
        label="Cargo"
        required
        value={data.jobTitle || ""}
        onChange={(e) => onChange("jobTitle", e.target.value)}
        error={errors.jobTitle}
        placeholder="Digite seu cargo"
        autoComplete="organization-title"
      />
    </div>
  );
}
