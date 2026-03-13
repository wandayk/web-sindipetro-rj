"use client";

import React from "react";
import { AssociateFormData } from "@/types/associate";

interface ResumoProps {
  data: Partial<AssociateFormData>;
}

// Função para formatar valores amigáveis
function formatGender(gender?: string): string {
  const genderMap: Record<string, string> = {
    M: "Masculino",
    F: "Feminino",
    OTHER: "Outro",
  };
  return gender ? genderMap[gender] || gender : "";
}

function formatMaritalStatus(status?: string): string {
  const statusMap: Record<string, string> = {
    SOLTEIRO: "Solteiro(a)",
    CASADO: "Casado(a)",
    DIVORCIADO: "Divorciado(a)",
    VIUVO: "Viúvo(a)",
    UNIAO_ESTAVEL: "União Estável",
  };
  return status ? statusMap[status] || status : "";
}

function formatWorkerStatus(status?: string): string {
  const statusMap: Record<string, string> = {
    ACTIVE: "Trabalhador Ativo",
    RETIRED: "Aposentado",
  };
  return status ? statusMap[status] || status : "";
}

function formatAddress(data: Partial<AssociateFormData>): string {
  const parts = [];
  if (data.street) parts.push(data.street);
  if (data.number) parts.push(data.number);
  if (data.complement) parts.push(`- ${data.complement}`);
  return parts.join(", ");
}

interface DataRowProps {
  label: string;
  value?: string;
}

function DataRow({ label, value }: DataRowProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-200 last:border-0">
      <span className="text-gray-600 text-sm sm:text-base mb-1 sm:mb-0">
        {label}
      </span>
      <span className="font-semibold text-gray-900 text-base sm:text-lg break-words">
        {value || "-"}
      </span>
    </div>
  );
}

export function Resumo({ data }: ResumoProps) {
  return (
    <div className="space-y-6">
      {/* Dados Pessoais */}
      <section>
        <h3 className="text-xl font-bold text-brand-primary mb-4 pb-2 border-b-2 border-brand-primary">
          Dados Pessoais
        </h3>
        <div className="space-y-1">
          <DataRow label="Nome completo" value={data.fullName} />
          <DataRow label="CPF" value={data.cpf} />
          <DataRow label="RG" value={data.rg} />
          <DataRow label="Data de nascimento" value={data.birthDate} />
          <DataRow label="Sexo" value={formatGender(data.gender)} />
          <DataRow
            label="Estado civil"
            value={formatMaritalStatus(data.maritalStatus)}
          />
        </div>
      </section>

      {/* Contato */}
      <section>
        <h3 className="text-xl font-bold text-brand-primary mb-4 pb-2 border-b-2 border-brand-primary">
          Contato
        </h3>
        <div className="space-y-1">
          <DataRow label="Telefone" value={data.phone} />
          <DataRow label="WhatsApp" value={data.whatsapp} />
          <DataRow label="E-mail" value={data.email} />
        </div>
      </section>

      {/* Endereço */}
      <section>
        <h3 className="text-xl font-bold text-brand-primary mb-4 pb-2 border-b-2 border-brand-primary">
          Endereço
        </h3>
        <div className="space-y-1">
          <DataRow label="CEP" value={data.cep} />
          <DataRow label="Endereço" value={formatAddress(data)} />
          <DataRow label="Bairro" value={data.neighborhood} />
          <DataRow
            label="Cidade/UF"
            value={
              data.city && data.state
                ? `${data.city} / ${data.state}`
                : data.city || data.state
            }
          />
        </div>
      </section>

      {/* Dados Profissionais */}
      <section>
        <h3 className="text-xl font-bold text-brand-primary mb-4 pb-2 border-b-2 border-brand-primary">
          Dados Profissionais
        </h3>
        <div className="space-y-1">
          <DataRow label="Tipo" value={formatWorkerStatus(data.workerStatus)} />
          <DataRow label="Empresa" value={data.company} />
          <DataRow label="Lotação" value={data.allocation} />
          <DataRow label="Prédio/Unidade" value={data.building} />
          <DataRow label="Matrícula" value={data.registration} />
          <DataRow label="Data de admissão" value={data.admissionDate} />
          <DataRow label="Cargo" value={data.jobTitle} />

          {/* Campos específicos de aposentado */}
          {data.workerStatus === "RETIRED" && (
            <>
              <DataRow
                label="Matrícula PETROS"
                value={data.petrosRegistration}
              />
              <DataRow label="Código de Benefício" value={data.benefitCode} />
              <DataRow
                label="Data da Aposentadoria"
                value={data.retirementDate}
              />
            </>
          )}
        </div>
      </section>

      {/* Alerta */}
      <div className="bg-brand-warning-light border-l-4 border-brand-warning p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl" aria-hidden="true">
            ⚠️
          </span>
          <div>
            <p className="font-semibold text-gray-900 mb-1">
              Confira todos os dados antes de continuar
            </p>
            <p className="text-sm text-gray-700">
              Na próxima etapa, você receberá um código de confirmação no seu
              celular para assinar eletronicamente sua ficha de filiação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
