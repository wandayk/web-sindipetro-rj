"use client";

import React from "react";
import { Input } from "../ui/Input";
import { DateInput } from "../ui/DateInput";
import { RadioGroup } from "../ui/RadioGroup";
import { AssociateFormData } from "@/types/associate";

interface DadosProfissionaisProps {
  data: Partial<AssociateFormData>;
  errors: Record<string, string>;
  onChange: (field: keyof AssociateFormData, value: string) => void;
}

const WORKER_STATUS_OPTIONS = [
  {
    value: "ACTIVE",
    label: "Trabalhador Ativo",
    description: "Atualmente empregado",
  },
  {
    value: "RETIRED",
    label: "Aposentado",
    description: "Já aposentado pela empresa",
  },
];

export function DadosProfissionais({
  data,
  errors,
  onChange,
}: DadosProfissionaisProps) {
  const isRetired = data.workerStatus === "RETIRED";

  const handleWorkerStatusChange = (value: string) => {
    onChange("workerStatus", value);

    // Limpar campos de aposentado se mudar para ACTIVE
    if (value === "ACTIVE") {
      onChange("petrosRegistration", "");
      onChange("benefitCode", "");
      onChange("retirementDate", "");
    }
  };

  return (
    <div className="space-y-5">
      {/* Seleção de Tipo de Trabalhador */}
      <RadioGroup
        label="Tipo de Trabalhador"
        required
        name="workerStatus"
        options={WORKER_STATUS_OPTIONS}
        value={data.workerStatus || ""}
        onChange={handleWorkerStatusChange}
        error={errors.workerStatus}
      />

      {/* Campos Compartilhados */}
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

      <DateInput
        label="Data de admissão"
        required
        value={data.admissionDate || ""}
        onChange={(value) => onChange("admissionDate", value)}
        error={errors.admissionDate}
        placeholder="DD/MM/AAAA"
        maxDate={new Date()}
        minDate={new Date(1950, 0, 1)}
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

      {/* Campos Exclusivos de Aposentado */}
      {isRetired && (
        <>
          <Input
            label="Matrícula PETROS"
            required
            value={data.petrosRegistration || ""}
            onChange={(e) => onChange("petrosRegistration", e.target.value)}
            error={errors.petrosRegistration}
            placeholder="Digite sua matrícula PETROS"
            inputMode="numeric"
            autoComplete="off"
          />

          <Input
            label="Código de Benefício (CB)"
            required
            value={data.benefitCode || ""}
            onChange={(e) => onChange("benefitCode", e.target.value)}
            error={errors.benefitCode}
            placeholder="Digite o código de benefício"
            autoComplete="off"
          />

          <DateInput
            label="Data da Aposentadoria"
            required
            value={data.retirementDate || ""}
            onChange={(value) => onChange("retirementDate", value)}
            error={errors.retirementDate}
            placeholder="DD/MM/AAAA"
            maxDate={new Date()}
            minDate={new Date(1950, 0, 1)}
          />
        </>
      )}
    </div>
  );
}
