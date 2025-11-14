import React from 'react';
import './App.css';
import Input from './components/input';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Captura de Leads</h1>
        <Input placeholder="Digite algo..." value="" onChange={(value) => console.log(value)} />
      </div>
    </div>
  );
}

export default App;
