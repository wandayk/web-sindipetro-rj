"use client";

import React from "react";
import { Input } from "../ui/Input";
import { maskPhone } from "@/lib/masks";
import { AssociateFormData } from "@/types/associate";

interface DadosContatoProps {
  data: Partial<AssociateFormData>;
  errors: Record<string, string>;
  onChange: (field: keyof AssociateFormData, value: string) => void;
}

export function DadosContato({
  data,
  errors,
  onChange,
}: DadosContatoProps) {
  return (
    <div className="space-y-5">
      <Input
        label="Telefone"
        required
        value={data.phone || ""}
        onChange={(e) => onChange("phone", e.target.value)}
        error={errors.phone}
        mask={maskPhone}
        placeholder="(00) 00000-0000"
        inputMode="tel"
        autoComplete="tel"
      />

      <Input
        label="WhatsApp"
        required
        value={data.whatsapp || ""}
        onChange={(e) => onChange("whatsapp", e.target.value)}
        error={errors.whatsapp}
        mask={maskPhone}
        placeholder="(00) 00000-0000"
        hint="Número que você usa no WhatsApp"
        inputMode="tel"
        autoComplete="tel"
      />

      <Input
        label="E-mail"
        required
        type="email"
        value={data.email || ""}
        onChange={(e) => onChange("email", e.target.value)}
        error={errors.email}
        placeholder="seuemail@exemplo.com"
        autoComplete="email"
      />
    </div>
  );
}
