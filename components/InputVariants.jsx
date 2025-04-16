import { Input } from '@material-tailwind/react';

export default function InputVariants({ name, label, id, placeholder, value, onChange, variant }) {


  const renderInput = () => {
    switch (variant) {
      case 'static':
        return <Input name={name}
                      className="input outline-none border-0 border-b-1 border-base-content/30 relative z-0 rounded-none"
                      variant="static" id={id} label={label} placeholder={placeholder} defaultValue={value}
                      onChange={onChange} />;
      default:
        return <Input name={name}
                      className="input outline-none border-0 border-b-1 border-base-content/30 relative z-0 rounded-none"
                      variant="standard" id={id} label={label} placeholder={placeholder} defaultValue={value}
                      onChange={onChange} />;
    }
  };

  return (
    <div className="flex w-72 flex-col gap-6">
      <label htmlFor={id}
             className="absolute z-10 -top-2 left-2 inline-block rounded-lg px-1 text-xs font-medium text-base-content bg-base-300">{label}</label>
      {renderInput()}
    </div>
  );
}

