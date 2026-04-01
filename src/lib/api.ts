import { AssociateFormData } from "@/types/associate";

// --- Filiação ---

interface FiliacaoPayload {
  filiado: {
    nomeCompleto: string;
    cpf: string;
    rg: string;
    dataNascimento: string;
    sexo: string;
    estadoCivil: string;
    telefone: string;
    whatsapp: string;
    email: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cidade: string;
    uf: string;
    situacao: string;
    empresa: string;
    lotacao: string;
    predio: string;
    matricula: string;
    dataAdmissao: string;
    cargo: string;
    matriculaPetros: string | null;
    codigoBeneficio: string | null;
    dataAposentadoria: string | null;
  };
  assinaturaEletronica: {
    lei: string;
    tipo: string;
    metodo: string;
    cpfValidado: string;
    whatsappConfirmado: string;
    assinadoEm: string;
    userAgent: string;
  };
}

export interface FiliacaoResponse {
  protocolo: string;
  assinadoEm: string;
}

function stripMask(value: string): string {
  return value.replace(/\D/g, "");
}

export function buildFiliacaoPayload(data: Partial<AssociateFormData>): FiliacaoPayload {
  return {
    filiado: {
      nomeCompleto: data.fullName || "",
      cpf: stripMask(data.cpf || ""),
      rg: data.rg || "",
      dataNascimento: data.birthDate || "",
      sexo: data.gender || "",
      estadoCivil: data.maritalStatus || "",
      telefone: stripMask(data.phone || ""),
      whatsapp: stripMask(data.whatsapp || ""),
      email: data.email || "",
      cep: stripMask(data.cep || ""),
      logradouro: data.street || "",
      numero: data.number || "",
      complemento: data.complement || null,
      bairro: data.neighborhood || "",
      cidade: data.city || "",
      uf: data.state || "",
      situacao: data.workerStatus || "ACTIVE",
      empresa: data.company || "",
      lotacao: data.allocation || "",
      predio: data.building || "",
      matricula: data.registration || "",
      dataAdmissao: data.admissionDate || "",
      cargo: data.jobTitle || "",
      matriculaPetros: data.petrosRegistration || null,
      codigoBeneficio: data.benefitCode || null,
      dataAposentadoria: data.retirementDate || null,
    },
    assinaturaEletronica: {
      lei: "14.063/2020",
      tipo: "Assinatura Eletrônica Simples",
      metodo: "OTP_WHATSAPP",
      cpfValidado: stripMask(data.cpf || ""),
      whatsappConfirmado: stripMask(data.whatsapp || ""),
      assinadoEm: new Date().toISOString(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    },
  };
}

export async function submitFiliacao(
  data: Partial<AssociateFormData>
): Promise<FiliacaoResponse> {
  const payload = buildFiliacaoPayload(data);

  const response = await fetch(
    "https://sindipetro-rj.onrender.com/api/filiacao",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao enviar dados: ${response.status}`);
  }

  return response.json();
}

// --- CEP ---

// Busca endereço pelo CEP usando a API ViaCEP
export async function fetchAddress(cep: string): Promise<{
  street: string;
  neighborhood: string;
  city: string;
  state: string;
} | null> {
  try {
    const cleanedCep = cep.replace(/\D/g, "");

    if (cleanedCep.length !== 8) {
      return null;
    }

    const response = await fetch(
      `https://viacep.com.br/ws/${cleanedCep}/json/`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // ViaCEP retorna { erro: true } quando o CEP não existe
    if (data.erro) {
      return null;
    }

    return {
      street: data.logradouro || "",
      neighborhood: data.bairro || "",
      city: data.localidade || "",
      state: data.uf || "",
    };
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
}
