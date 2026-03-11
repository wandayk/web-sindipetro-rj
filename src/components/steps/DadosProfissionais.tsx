"use client";

import React from "react";
import { Input } from "../ui/Input";
import { maskCNPJ, maskDate } from "@/lib/masks";
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
        label="Nome da empresa"
        required
        value={data.companyName || ""}
        onChange={(e) => onChange("companyName", e.target.value)}
        error={errors.companyName}
        placeholder="Digite o nome da empresa"
        autoComplete="organization"
      />

      <Input
        label="CNPJ da empresa"
        required
        value={data.companyCnpj || ""}
        onChange={(e) => onChange("companyCnpj", e.target.value)}
        error={errors.companyCnpj}
        mask={maskCNPJ}
        placeholder="00.000.000/0000-00"
        inputMode="numeric"
        autoComplete="off"
      />

      <Input
        label="Cargo/Função"
        required
        value={data.jobTitle || ""}
        onChange={(e) => onChange("jobTitle", e.target.value)}
        error={errors.jobTitle}
        placeholder="Digite seu cargo ou função"
        autoComplete="organization-title"
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
    </div>
  );
}
