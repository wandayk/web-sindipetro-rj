// Máscara para CPF: 000.000.000-00
export function maskCPF(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  const limited = cleaned.substring(0, 11);

  if (limited.length <= 3) return limited;
  if (limited.length <= 6)
    return `${limited.substring(0, 3)}.${limited.substring(3)}`;
  if (limited.length <= 9)
    return `${limited.substring(0, 3)}.${limited.substring(3, 6)}.${limited.substring(6)}`;
  return `${limited.substring(0, 3)}.${limited.substring(3, 6)}.${limited.substring(6, 9)}-${limited.substring(9)}`;
}

// Máscara para telefone: (00) 00000-0000 ou (00) 0000-0000
export function maskPhone(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  const limited = cleaned.substring(0, 11);

  if (limited.length <= 2) return limited.length > 0 ? `(${limited}` : "";
  if (limited.length <= 6)
    return `(${limited.substring(0, 2)}) ${limited.substring(2)}`;

  if (limited.length <= 10) {
    return `(${limited.substring(0, 2)}) ${limited.substring(2, 6)}-${limited.substring(6)}`;
  }

  return `(${limited.substring(0, 2)}) ${limited.substring(2, 7)}-${limited.substring(7)}`;
}

// Máscara para CEP: 00000-000
export function maskCEP(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  const limited = cleaned.substring(0, 8);

  if (limited.length <= 5) return limited;
  return `${limited.substring(0, 5)}-${limited.substring(5)}`;
}

// Máscara para CNPJ: 00.000.000/0000-00
export function maskCNPJ(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  const limited = cleaned.substring(0, 14);

  if (limited.length <= 2) return limited;
  if (limited.length <= 5)
    return `${limited.substring(0, 2)}.${limited.substring(2)}`;
  if (limited.length <= 8)
    return `${limited.substring(0, 2)}.${limited.substring(2, 5)}.${limited.substring(5)}`;
  if (limited.length <= 12)
    return `${limited.substring(0, 2)}.${limited.substring(2, 5)}.${limited.substring(5, 8)}/${limited.substring(8)}`;
  return `${limited.substring(0, 2)}.${limited.substring(2, 5)}.${limited.substring(5, 8)}/${limited.substring(8, 12)}-${limited.substring(12)}`;
}

// Máscara para data: DD/MM/AAAA
export function maskDate(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  const limited = cleaned.substring(0, 8);

  if (limited.length <= 2) return limited;
  if (limited.length <= 4)
    return `${limited.substring(0, 2)}/${limited.substring(2)}`;
  return `${limited.substring(0, 2)}/${limited.substring(2, 4)}/${limited.substring(4)}`;
}
