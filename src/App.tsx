'use client';

// Importações necessárias
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from './api/axios';

// Importações de componentes e estilos
import './App.css';
import Input from './components/input';
import ButtonForms from './components/buttonForms';
import Select from './components/Select';

// Importações de validações
import { validarCelular, formatarCelular } from './validations/celphone';
import { fetchAddressByCEP, formatarCEP, validateCEP } from './validations/adress';

const App: React.FC = () => {
  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+55');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [trafficSource, setTrafficSource] = useState('');
  const [isCepValid, setIsCepValid] = useState(false);

  // Função para gerar ID único com UUID
  const generateId = () => {
    return uuidv4();
  };

  // Opções de código do país
  const countryCodeOptions = [
    { value: '+55', label: '+55 (Brasil)' },
    { value: '+1', label: '+1 (EUA/Canadá)' },
    { value: '+54', label: '+54 (Argentina)' },
    { value: '+56', label: '+56 (Chile)' },
    { value: '+57', label: '+57 (Colômbia)' },
    { value: '+51', label: '+51 (Peru)' },
    { value: '+598', label: '+598 (Uruguai)' },
    { value: '+595', label: '+595 (Paraguai)' },
    { value: '+593', label: '+593 (Equador)' },
    { value: '+591', label: '+591 (Bolívia)' },
    { value: '+58', label: '+58 (Venezuela)' },
    { value: '+351', label: '+351 (Portugal)' },
    { value: '+34', label: '+34 (Espanha)' },
    { value: '+33', label: '+33 (França)' },
    { value: '+49', label: '+49 (Alemanha)' },
    { value: '+39', label: '+39 (Itália)' },
    { value: '+44', label: '+44 (Reino Unido)' }
  ];

  // Opções de fonte de tráfego
  const trafficSourceOptions = [
    { value: 'google-ads', label: 'Google Ads' },
    { value: 'facebook-ads', label: 'Facebook Ads' },
    { value: 'instagram-ads', label: 'Instagram Ads' },
    { value: 'seo', label: 'SEO (Busca Orgânica)' },
    { value: 'email-marketing', label: 'Email Marketing' },
    { value: 'youtube-ads', label: 'YouTube Ads' },
    { value: 'tiktok-ads', label: 'TikTok Ads' },
    { value: 'linkedin-ads', label: 'LinkedIn Ads' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'indicacao', label: 'Indicação' },
    { value: 'outros', label: 'Outros' }
  ];

  // Dados do formulário
  const formData = {
    id: generateId(),
    name,
    tel: `${countryCode} ${phone}`,
    city,
    vehicleYear,
    trafficSource,
  };

  // Função para envio do formulário
  const handleSubmit = async () => {

    // Verificação de campos obrigatórios

    // Código do país Ex: +55
    if (!countryCode) {
      alert('Por favor, selecione o código do país.');
      return;
    }

    // Validação do número de celular
    if (!validarCelular(phone)) {
      alert('Número de celular inválido. Certifique-se de que o número contém 11 dígitos e o terceiro dígito é 9.');
      return;
    }

    // Validação do CEP e cidade
    if (!validateCEP(cep) || !isCepValid) {
      alert('CEP inválido ou não encontrado. Certifique-se de que o CEP é válido e a cidade foi carregada.');
      return;
    }

    if (!city) {
      alert('Aguarde o carregamento da cidade ou verifique se o CEP está correto.');
      return;
    }

    // Validação do ano do veículo
    if (!vehicleYear) {
      alert('Por favor, informe o ano do veículo.');
      return;
    }

    // Validação da fonte de tráfego
    if (!trafficSource) {
      alert('Por favor, informe a fonte de tráfego.');
      return;
    }


    // Envio dos dados para a API e tratamento de erros
    try {
      const response = await api.post('', formData);
      console.log('Lead enviado com sucesso:', response.data);
      console.log(formData);
      alert('Lead cadastrado com sucesso!');
      
      // Limpar formulário
      setName('');
      setPhone('');
      setCep('');
      setCity('');
      setIsCepValid(false);
      setVehicleYear('');
      setTrafficSource('');
    } catch (error) {
      console.error('Erro ao enviar lead:', error);
      alert('Erro ao cadastrar lead. Tente novamente.');
    }
  }

  // Função para lidar com a mudança no campo de telefone
  const handlePhoneChange = (value: string) => {
    const numeros = value.replace(/\D/g, '');
    
    if (numeros.length <= 11) {
      if (numeros.length === 11) {
        const formatado = formatarCelular(numeros);
        setPhone(formatado);
      } else {
        setPhone(numeros);
      }
    }
  }

  // Função para lidar com a mudança no campo de CEP
  const handleCepChange = async (value: string) => {
    const numeros = value.replace(/\D/g, '');
    
    if (numeros.length <= 8) {
      const formatado = formatarCEP(numeros);
      setCep(formatado);
      
      if (numeros.length === 8) {
        const address = await fetchAddressByCEP(numeros);
        if (address) {
          setCity(`${address.localidade} - ${address.uf}`);
          setIsCepValid(true);
        } else {
          setCity('');
          setIsCepValid(false);
        }
      } else {
        setCity('');
        setIsCepValid(false);
      }
    }
  }

  // Função para limitar ano do veículo a 4 dígitos e eliminar caracteres não numéricos
  const handleVehicleYearChange = (value: string) => {
    const numeros = value.replace(/\D/g, '');
    if (numeros.length <= 4) {
      setVehicleYear(numeros);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Formulário de captura de leads */}
      <form className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Captura de Leads</h1>
        <Input type='text' placeholder="Digite seu nome" tittle='Nome:' value={name} onChange={setName} />
        <div>
          <label className='mb-4 text-md font-medium'>Telefone:</label>
          <div className="flex gap-2">
            <div className="w-32">
              <Select title='' value={countryCode} onChange={setCountryCode} options={countryCodeOptions} placeholder="País" />
            </div>
            <div className="flex-1">
              <Input type='text' placeholder="Digite seu Telefone" tittle='' value={phone} onChange={handlePhoneChange} />
            </div>
          </div>
        </div>
        <Input type='text' placeholder="Digite seu CEP" tittle='CEP:' value={cep} onChange={handleCepChange} />
        <Input type='text' placeholder="Ex: 2020" tittle='Ano do Veículo:' value={vehicleYear} onChange={handleVehicleYearChange} />
        <Select title='Fonte de Tráfego:' value={trafficSource} onChange={setTrafficSource} options={trafficSourceOptions} placeholder="Selecione a fonte de tráfego" />
        <ButtonForms onclick={handleSubmit} labelButton="Enviar" />
      </form>
    </div>
  );
}

export default App;
