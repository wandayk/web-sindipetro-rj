"use client";

import React from "react";
import { Button } from "../ui/Button";
import { OtpInput } from "../ui/OtpInput";
import { useOtp } from "@/hooks/useOtp";
import { AssociateFormData } from "@/types/associate";

interface CodigoConfirmacaoProps {
  data: Partial<AssociateFormData>;
  onConfirm: () => void;
  onBack: () => void;
}

export function CodigoConfirmacao({
  data,
  onConfirm,
  onBack,
}: CodigoConfirmacaoProps) {
  const {
    otpSent,
    otpValue,
    setOtpValue,
    timer,
    formatTimer,
    loading,
    error,
    sendOtp,
    verifyOtp,
    resendOtp,
    canResend,
  } = useOtp();

  const handleSendOtp = async () => {
    await sendOtp();
  };

  const handleVerifyOtp = async () => {
    const isValid = await verifyOtp();
    if (isValid) {
      onConfirm();
    }
  };

  const maskPhone = (phone?: string): string => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  // Estado 1: Antes de enviar o código
  if (!otpSent) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-7xl mb-6" aria-hidden="true">
            📱
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Vamos enviar um código de confirmação
          </h3>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Enviaremos um código de 6 números para o seu WhatsApp{" "}
            <strong className="text-gray-900">
              {maskPhone(data.whatsapp)}
            </strong>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={handleSendOtp}
            variant="primary"
            loading={loading}
            disabled={loading}
          >
            Enviar código
          </Button>

          <Button onClick={onBack} variant="secondary" disabled={loading}>
            Voltar e revisar dados
          </Button>
        </div>
      </div>
    );
  }

  // Estado 2: Após enviar o código
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Digite o código recebido
        </h3>
        <p className="text-gray-600">
          Enviamos para{" "}
          <strong className="text-gray-900">{maskPhone(data.whatsapp)}</strong>
        </p>
      </div>

      <div className="py-6">
        <OtpInput
          length={6}
          value={otpValue}
          onChange={setOtpValue}
          disabled={loading}
        />
      </div>

      {error && (
        <div className="text-center text-brand-error font-medium">
          {error}
        </div>
      )}

      <div className="text-center text-sm text-gray-600">
        {canResend ? (
          <button
            onClick={resendOtp}
            className="text-brand-primary font-semibold hover:underline"
            disabled={loading}
          >
            Reenviar código
          </button>
        ) : (
          <span>Reenviar código em {formatTimer()}</span>
        )}
      </div>

      <div className="bg-brand-primary-light border-l-4 border-brand-primary p-4 rounded-r-lg">
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong className="text-gray-900">Assinatura Eletrônica:</strong> Ao
          confirmar, você assina eletronicamente sua ficha de filiação sindical
          nos termos da Lei nº 14.063/2020 (Assinatura Eletrônica Simples).
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleVerifyOtp}
          variant="success"
          icon="🔒"
          loading={loading}
          disabled={otpValue.length !== 6 || loading}
        >
          Confirmar e Assinar
        </Button>

        <Button onClick={onBack} variant="secondary" disabled={loading}>
          Voltar
        </Button>
      </div>
    </div>
  );
}
