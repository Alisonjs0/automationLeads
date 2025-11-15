'use client';

import { useState } from 'react';

import './App.css';
import Input from './components/input';
import ButtonForms from './components/buttonForms';
import { validarCelular, formatarCelular } from './validations/celphone';
import { fetchAddressByCEP, formatarCEP, validateCEP } from './validations/adress';
import api from './api/axios';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [isCepValid, setIsCepValid] = useState(false);

  const formData = {
    name,
    tel: phone,
    city
  };

  const handleSubmit = async () => {
    if (!validarCelular(phone)) {
      alert('Número de celular inválido. Certifique-se de que o número contém 11 dígitos e o terceiro dígito é 9.');
      return;
    }

    if (!validateCEP(cep) || !isCepValid) {
      alert('CEP inválido ou não encontrado. Certifique-se de que o CEP é válido e a cidade foi carregada.');
      return;
    }

    if (!city) {
      alert('Aguarde o carregamento da cidade ou verifique se o CEP está correto.');
      return;
    }

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
    } catch (error) {
      console.error('Erro ao enviar lead:', error);
      alert('Erro ao cadastrar lead. Tente novamente.');
    }
  }

  const handlePhoneChange = (value: string) => {
    const numeros = value.replace(/\D/g, '');
    
    if (numeros.length <= 11) {
      const formatado = formatarCelular(numeros);
      setPhone(formatado);
    }
  }

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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Captura de Leads</h1>
        <Input type='text' placeholder="Digite seu nome" tittle='Nome:' value={name} onChange={setName} />
        <Input type='text' placeholder="Digite seu Telefone" tittle='Telefone:' value={phone} onChange={handlePhoneChange} />
        <Input type='text' placeholder="Digite seu CEP" tittle='CEP:' value={cep} onChange={handleCepChange} />
        <ButtonForms onclick={handleSubmit} labelButton="Enviar" />
      </div>
    </div>
  );
}

export default App;
