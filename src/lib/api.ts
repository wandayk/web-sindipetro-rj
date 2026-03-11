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
