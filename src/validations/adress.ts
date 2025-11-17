import axios from 'axios';

export interface AddressData {
  localidade: string;
  uf: string;
}

// Função para buscar endereço via API do ViaCEP
export const fetchAddressByCEP = async (cep: string): Promise<AddressData | null> => {
  try {
    const cleanCEP = cep.replace(/\D/g, '');
    
    if (cleanCEP.length !== 8) {
      throw new Error('CEP inválido. Deve conter 8 dígitos.');
    }
    
    const response = await axios.get<AddressData>(
      `https://viacep.com.br/ws/${cleanCEP}/json/`
    );
    
    if (response.data && 'erro' in response.data) {
      throw new Error('CEP não encontrado.');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao buscar CEP:', error.message);
    } else if (error instanceof Error) {
      console.error('Erro:', error.message);
    }
    return null;
  }
};

// Função para validar o formato do CEP
export const validateCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8;
};

// Função para formatar o CEP no padrão 00000-000
export const formatarCEP = (cep: string): string => {
  const numeros = cep.replace(/\D/g, '');
  
  if (numeros.length <= 5) {
    return numeros;
  }
  
  const parte1 = numeros.slice(0, 5);
  const parte2 = numeros.slice(5, 8);
  
  return `${parte1}-${parte2}`;
};
