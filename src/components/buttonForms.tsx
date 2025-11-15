interface ButtonFormsProps {
    onclick: () => void;
    labelButton: string;
}

const ButtonForms: React.FC<ButtonFormsProps> = ({ onclick, labelButton }) => {
  return (
    <div className="w-full">
      <button className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600" onClick={onclick}>{labelButton}</button>
    </div>
  )
}

export default ButtonForms
