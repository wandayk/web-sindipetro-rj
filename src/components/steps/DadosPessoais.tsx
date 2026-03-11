"use client";

import React from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { maskCPF, maskDate } from "@/lib/masks";
import { AssociateFormData } from "@/types/associate";

interface DadosPessoaisProps {
  data: Partial<AssociateFormData>;
  errors: Record<string, string>;
  onChange: (field: keyof AssociateFormData, value: string) => void;
}

const GENDER_OPTIONS = [
  { value: "M", label: "Masculino" },
  { value: "F", label: "Feminino" },
  { value: "OTHER", label: "Outro" },
];

const MARITAL_STATUS_OPTIONS = [
  { value: "SOLTEIRO", label: "Solteiro(a)" },
  { value: "CASADO", label: "Casado(a)" },
  { value: "DIVORCIADO", label: "Divorciado(a)" },
  { value: "VIUVO", label: "Viúvo(a)" },
  { value: "UNIAO_ESTAVEL", label: "União Estável" },
];

export function DadosPessoais({
  data,
  errors,
  onChange,
}: DadosPessoaisProps) {
  return (
    <div className="space-y-5">
      <Input
        label="Nome completo"
        required
        value={data.fullName || ""}
        onChange={(e) => onChange("fullName", e.target.value)}
        error={errors.fullName}
        placeholder="Digite seu nome completo"
        autoComplete="name"
      />

      <Input
        label="CPF"
        required
        value={data.cpf || ""}
        onChange={(e) => onChange("cpf", e.target.value)}
        error={errors.cpf}
        mask={maskCPF}
        placeholder="000.000.000-00"
        inputMode="numeric"
        autoComplete="off"
      />

      <Input
        label="RG"
        required
        value={data.rg || ""}
        onChange={(e) => onChange("rg", e.target.value)}
        error={errors.rg}
        placeholder="Digite seu RG"
        autoComplete="off"
      />

      <Input
        label="Data de nascimento"
        required
        value={data.birthDate || ""}
        onChange={(e) => onChange("birthDate", e.target.value)}
        error={errors.birthDate}
        mask={maskDate}
        placeholder="DD/MM/AAAA"
        inputMode="numeric"
        autoComplete="bday"
      />

      <Select
        label="Sexo"
        required
        value={data.gender || ""}
        onChange={(e) => onChange("gender", e.target.value)}
        error={errors.gender}
        options={GENDER_OPTIONS}
      />

      <Select
        label="Estado civil"
        required
        value={data.maritalStatus || ""}
        onChange={(e) => onChange("maritalStatus", e.target.value)}
        error={errors.maritalStatus}
        options={MARITAL_STATUS_OPTIONS}
      />
    </div>
  );
}
