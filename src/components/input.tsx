import React from 'react';

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-4">
      <input 
        type="text" 
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default Input;
