"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { maskCEP } from "@/lib/masks";
import { fetchAddress } from "@/lib/api";
import { AssociateFormData } from "@/types/associate";

interface DadosEnderecoProps {
  data: Partial<AssociateFormData>;
  errors: Record<string, string>;
  onChange: (field: keyof AssociateFormData, value: string) => void;
}

const BRAZILIAN_STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export function DadosEndereco({
  data,
  errors,
  onChange,
}: DadosEnderecoProps) {
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");

  // Busca endereço quando o CEP tem 8 dígitos
  useEffect(() => {
    const cleanedCep = data.cep?.replace(/\D/g, "") || "";

    if (cleanedCep.length === 8) {
      setLoadingCep(true);
      setCepError("");

      fetchAddress(cleanedCep)
        .then((address) => {
          if (address) {
            onChange("street", address.street);
            onChange("neighborhood", address.neighborhood);
            onChange("city", address.city);
            onChange("state", address.state);
          } else {
            setCepError("CEP não encontrado");
          }
        })
        .catch(() => {
          setCepError("Erro ao buscar CEP");
        })
        .finally(() => {
          setLoadingCep(false);
        });
    }
  }, [data.cep, onChange]);

  const isAddressFieldsDisabled = loadingCep || !data.cep || data.cep.replace(/\D/g, "").length < 8;

  return (
    <div className="space-y-5">
      <Input
        label="CEP"
        required
        value={data.cep || ""}
        onChange={(e) => {
          onChange("cep", e.target.value);
          setCepError("");
        }}
        error={errors.cep || cepError}
        mask={maskCEP}
        placeholder="00000-000"
        inputMode="numeric"
        autoComplete="postal-code"
      />

      {loadingCep && (
        <div className="text-center py-4">
          <p className="text-brand-primary font-medium">
            Buscando endereço...
          </p>
        </div>
      )}

      <Input
        label="Logradouro"
        required
        value={data.street || ""}
        onChange={(e) => onChange("street", e.target.value)}
        error={errors.street}
        placeholder="Rua, avenida, etc."
        disabled={isAddressFieldsDisabled}
        autoComplete="street-address"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Número"
          required
          value={data.number || ""}
          onChange={(e) => onChange("number", e.target.value)}
          error={errors.number}
          placeholder="123"
          disabled={isAddressFieldsDisabled}
          autoComplete="off"
        />

        <Input
          label="Complemento"
          value={data.complement || ""}
          onChange={(e) => onChange("complement", e.target.value)}
          error={errors.complement}
          placeholder="Apto, sala, etc."
          disabled={isAddressFieldsDisabled}
          autoComplete="off"
        />
      </div>

      <Input
        label="Bairro"
        required
        value={data.neighborhood || ""}
        onChange={(e) => onChange("neighborhood", e.target.value)}
        error={errors.neighborhood}
        placeholder="Nome do bairro"
        disabled={isAddressFieldsDisabled}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="sm:col-span-2">
          <Input
            label="Cidade"
            required
            value={data.city || ""}
            onChange={(e) => onChange("city", e.target.value)}
            error={errors.city}
            placeholder="Nome da cidade"
            disabled={isAddressFieldsDisabled}
            autoComplete="address-level2"
          />
        </div>

        <Select
          label="Estado"
          required
          value={data.state || ""}
          onChange={(e) => onChange("state", e.target.value)}
          error={errors.state}
          options={BRAZILIAN_STATES}
          disabled={isAddressFieldsDisabled}
        />
      </div>
    </div>
  );
}
