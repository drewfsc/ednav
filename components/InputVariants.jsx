import { Input } from '@material-tailwind/react';
// Modified InputVariants.jsx

export default function InputVariants({ label, name, handleChange, required, options, value, error, type }) {
  // Your existing component code...
  const optionsLength = options?.length || 0;
  return (
    <div>
      {optionsLength ? (
        <div className="flex flex-col">
          <label htmlFor={name} className="mb-1 text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <select name={name} id={name} onChange={handleChange}
                  className="input outline-none border-0 border-b-1 border-base-content/30 relative z-0 rounded-none">
            {options.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex flex-col">
          <label htmlFor={name} className="mb-1 text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </label>

          <Input name={name}
                 className="input outline-none border-0 border-b-1 border-base-content/30 relative z-0 rounded-none"
                 variant="static" id={name} label={label} placeholder={label} defaultValue={value} type={type}
                 onChange={handleChange} />

          {/* Add error display */}
          {error && (
            <p className="mt-1 text-sm text-red-500">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}

