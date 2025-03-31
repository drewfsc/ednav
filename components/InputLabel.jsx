import React from 'react';

export default function InputLabel({name, handleChange, type, value, label, options}) {
  if (type === 'textarea') {
    return (
      <div className="relative col-span-2">
        <label
          htmlFor={name}
          className="absolute z-10 -top-2 left-2 inline-block rounded-lg  px-1 text-xs font-medium text-base-content bg-base-300"
        >{label}</label>
          <textarea id={name} placeholder={label} value={value} onChange={handleChange} className="input w-full border p-2 rounded-md relative z-0 min-h-32"/>

      </div>
    )
  } else if (type === 'select') {
    return (
      <div className="relative">
        <label
          htmlFor={name}
          className="absolute z-10 -top-2 left-2 inline-block rounded-lg  px-1 text-xs font-medium text-base-content bg-base-300"
        >{label}</label>
          <select autoComplete={"true"} id={name} value={value} onChange={handleChange} className="input w-full border p-2 rounded-md relative z-0">
            <option value="">{label}</option>
            {
             options && options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))
            }
          </select>
      </div>
    )
  } else {
    return (
      <div className="relative">
        <label
          htmlFor={name}
          className="absolute z-10 -top-2 left-2 inline-block rounded-lg  px-1 text-xs font-medium text-base-content bg-base-300"
        >
          {label}
        </label>
        <input
          autoComplete={"true"}
          type={type}
          id={name}
          placeholder={label}
          value={value}
          onChange={handleChange}
          className="input w-full border p-2 rounded-md relative z-0"
        />
      </div>
    )
  }

}
