import React from "react";

interface InputProps {
  placeholder: string;
  value: string;
  tittle: string;
  type: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}
// Componente Input reutilizável
const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  tittle,
  type,
  onChange,
  disabled = false,
  className = "",
}) => {
  // Função para envio de dados ao componente pai
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <label className="mb-4 text-md font-medium">{tittle}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      />
    </div>
  );
};

export default Input;
