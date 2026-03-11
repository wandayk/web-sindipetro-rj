import Link from "next/link";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
            Filie-se ao Sindicato
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Preencha seu cadastro online em poucos minutos
          </p>

          <Link
            href="/cadastro"
            className="inline-block bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            Iniciar Cadastro
          </Link>
        </div>

        {/* Benefícios */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Por que se filiar?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl" aria-hidden="true">
                ⚖️
              </span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Defesa dos direitos trabalhistas
                </h4>
                <p className="text-sm text-gray-600">
                  Representação jurídica e apoio em questões trabalhistas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl" aria-hidden="true">
                🏥
              </span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Benefícios e convênios
                </h4>
                <p className="text-sm text-gray-600">
                  Acesso a convênios médicos, odontológicos e descontos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl" aria-hidden="true">
                📚
              </span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Cursos e capacitação
                </h4>
                <p className="text-sm text-gray-600">
                  Programas de qualificação profissional gratuitos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl" aria-hidden="true">
                🤝
              </span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Negociação coletiva
                </h4>
                <p className="text-sm text-gray-600">
                  Participação em acordos e convenções coletivas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vantagens do cadastro online */}
        <div className="bg-brand-primary-light rounded-2xl p-6 sm:p-8 border-2 border-brand-primary/20">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Cadastro 100% online
          </h3>

          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-brand-accent text-2xl" aria-hidden="true">
                ✓
              </span>
              <span className="text-gray-800">
                Sem impressão, sem scanner, sem complicação
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-accent text-2xl" aria-hidden="true">
                ✓
              </span>
              <span className="text-gray-800">
                Assinatura eletrônica válida (Lei 14.063/2020)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-accent text-2xl" aria-hidden="true">
                ✓
              </span>
              <span className="text-gray-800">
                Confirmação por WhatsApp em tempo real
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-accent text-2xl" aria-hidden="true">
                ✓
              </span>
              <span className="text-gray-800">
                Processo simples e rápido (menos de 10 minutos)
              </span>
            </li>
          </ul>
        </div>

        {/* CTA final */}
        <div className="text-center mt-12">
          <Link
            href="/cadastro"
            className="inline-block bg-brand-accent hover:bg-[#0c7450] text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            Começar agora
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Leva menos de 10 minutos
          </p>
        </div>
      </main>
    </div>
  );
}
