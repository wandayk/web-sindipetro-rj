export interface AssociateFormData {
  // Dados Pessoais
  fullName: string;
  cpf: string;
  rg: string;
  birthDate: string;
  gender: "M" | "F" | "OTHER";
  maritalStatus: string;

  // Dados de Contato
  phone: string;
  whatsapp: string;
  email: string;

  // Endereço
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;

  // Dados Profissionais
  company: string;
  allocation: string;
  building: string;
  registration: string;
  admissionDate: string;
  jobTitle: string;
}
