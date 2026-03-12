import { z } from "zod";

// Função de validação de CPF
export function isValidCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleaned = cpf.replace(/\D/g, "");

  // Verifica se tem 11 dígitos
  if (cleaned.length !== 11) return false;

  // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
  if (/^(\d)\1+$/.test(cleaned)) return false;

  // Valida primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleaned.charAt(9))) return false;

  // Valida segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleaned.charAt(10))) return false;

  return true;
}

// Validação de data DD/MM/AAAA
function isValidDate(dateStr: string): boolean {
  const cleaned = dateStr.replace(/\D/g, "");
  if (cleaned.length !== 8) return false;

  const day = parseInt(cleaned.substring(0, 2));
  const month = parseInt(cleaned.substring(2, 4));
  const year = parseInt(cleaned.substring(4, 8));

  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;

  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
}

// Schema para dados pessoais
export const personalDataSchema = z.object({
  fullName: z
    .string()
    .min(3, "Informe seu nome completo")
    .regex(/\s/, "Informe nome e sobrenome"),
  cpf: z
    .string()
    .min(1, "Informe seu CPF")
    .refine(isValidCPF, "CPF inválido"),
  rg: z.string().min(1, "Informe seu RG"),
  birthDate: z
    .string()
    .min(1, "Informe sua data de nascimento")
    .refine(isValidDate, "Data inválida"),
  gender: z.enum(["M", "F", "OTHER"], {
    message: "Selecione o sexo",
  }),
  maritalStatus: z.string().min(1, "Selecione o estado civil"),
});

// Schema para dados de contato
export const contactDataSchema = z.object({
  phone: z
    .string()
    .min(1, "Informe seu telefone")
    .refine((val) => {
      const cleaned = val.replace(/\D/g, "");
      return cleaned.length === 10 || cleaned.length === 11;
    }, "Telefone inválido"),
  whatsapp: z
    .string()
    .min(1, "Informe seu WhatsApp")
    .refine((val) => {
      const cleaned = val.replace(/\D/g, "");
      return cleaned.length === 10 || cleaned.length === 11;
    }, "WhatsApp inválido"),
  email: z.string().email("Informe um e-mail válido"),
});

// Schema para dados de endereço
export const addressDataSchema = z.object({
  cep: z
    .string()
    .min(1, "Informe o CEP")
    .refine((val) => {
      const cleaned = val.replace(/\D/g, "");
      return cleaned.length === 8;
    }, "CEP inválido"),
  street: z.string().min(1, "Informe o logradouro"),
  number: z.string().min(1, "Informe o número"),
  complement: z.union([z.string(), z.undefined()]).optional(),
  neighborhood: z.string().min(1, "Informe o bairro"),
  city: z.string().min(1, "Informe a cidade"),
  state: z.string().min(1, "Informe o estado").refine(
    (val) => val.length === 2,
    "Estado deve ter 2 caracteres"
  ),
});

// Schema para dados profissionais
export const professionalDataSchema = z.object({
  companyName: z.string().min(1, "Informe o nome da empresa"),
  companyCnpj: z
    .string()
    .min(1, "Informe o CNPJ da empresa")
    .refine((val) => {
      const cleaned = val.replace(/\D/g, "");
      return cleaned.length === 14;
    }, "CNPJ inválido"),
  jobTitle: z.string().min(1, "Informe seu cargo"),
  admissionDate: z
    .string()
    .min(1, "Informe a data de admissão")
    .refine(isValidDate, "Data inválida"),
});
