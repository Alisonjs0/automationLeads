import React from 'react';

interface SelectProps {
    title: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    className?: string;
}

  // Componente Select reutilizável
const Select: React.FC<SelectProps> = ({ title, value, onChange, options, placeholder = "Selecione uma opção", className }) => {
  // Função para envio de dados ao componente pai
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label className='mb-4 text-md font-medium'>{title}</label>
      <select 
        value={value}
        onChange={handleChange}
        className={`w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;