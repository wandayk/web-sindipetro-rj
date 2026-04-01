"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";

function SuccessContent() {
  const searchParams = useSearchParams();
  const protocolo = searchParams.get("protocolo");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="relative -mt-18 mx-auto max-w-2xl px-4 mb-6">
        <div className="bg-white border-black/10 border rounded-4xl shadow-2xl min-h-[calc(100vh-280px)] pt-16 pb-16 px-6">

          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-linear-to-br from-brand-accent to-brand-accent/80 rounded-full mb-8 shadow-lg">
              <svg
                className="w-20 h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cadastro Concluído!
            </h2>

            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              Seus dados foram enviados com sucesso. Em breve você receberá a confirmação da sua filiação.
            </p>

            {protocolo && (
              <div className="mt-8 inline-block bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4">
                <p className="text-sm text-gray-500 mb-1">Número de protocolo</p>
                <p className="text-xl font-mono font-bold text-brand-primary tracking-wider">
                  {protocolo}
                </p>
              </div>
            )}
          </div>

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
