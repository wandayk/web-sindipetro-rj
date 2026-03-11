"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const whatsapp = searchParams.get("whatsapp") || "";

  // Gera código fictício de verificação
  const generateVerificationCode = () => {
    const timestamp = Date.now().toString().slice(-8);
    return `SND-2026-${timestamp}`;
  };

  const verificationCode = generateVerificationCode();

  const maskPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-brand-primary text-white py-6 shadow-md">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-center">
            Sindicato dos Trabalhadores
          </h1>
          <p className="text-brand-primary-light text-center mt-1 text-lg">
            Filiação Online
          </p>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Ícone de sucesso */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-brand-accent rounded-full mb-6">
            <span className="text-6xl" aria-hidden="true">
              ✅
            </span>
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
            Cadastro Recebido!
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Seus dados foram recebidos com sucesso. O sindicato entrará em
            contato com a sua empresa para confirmar a filiação.
          </p>
        </div>

        {/* Cards informativos */}
        <div className="space-y-4 mb-8">
          {/* Card WhatsApp */}
          {whatsapp && (
            <div className="bg-brand-accent-light border-l-4 border-brand-accent p-5 rounded-r-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">
                  📱
                </span>
                <p className="text-gray-800">
                  Você receberá atualizações por WhatsApp no número{" "}
                  <strong className="text-gray-900">
                    {maskPhone(whatsapp)}
                  </strong>
                </p>
              </div>
            </div>
          )}

          {/* Card assinatura eletrônica */}
          <div className="bg-brand-primary-light border-l-4 border-brand-primary p-5 rounded-r-lg">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">
                🔐
              </span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  Assinatura Eletrônica Registrada
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Documento assinado em conformidade com a{" "}
                  <strong>Lei nº 14.063/2020</strong>
                </p>
                <div className="bg-white/50 p-3 rounded-lg border border-brand-primary/20">
                  <p className="text-xs text-gray-600 mb-1">
                    Evidências registradas:
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• CPF validado</li>
                    <li>• Telefone confirmado</li>
                    <li>• Data e hora: {new Date().toLocaleString("pt-BR")}</li>
                    <li>• Código de verificação</li>
                  </ul>
                </div>
                <p className="text-sm font-mono font-semibold text-brand-primary mt-3">
                  {verificationCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Próximos passos */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Próximos passos
          </h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              <p className="text-gray-700 pt-0.5">
                O sindicato verificará seus dados junto à empresa
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              <p className="text-gray-700 pt-0.5">
                Você receberá uma confirmação por WhatsApp
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              <p className="text-gray-700 pt-0.5">
                Após aprovação, você terá acesso aos benefícios do sindicato
              </p>
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
}

export default function SucessoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
