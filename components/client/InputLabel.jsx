import React from "react";

export default function InputLabel({
  name,
  handleChange,
  type,
  value,
  label,
  options,
}) {
  if (type === "textarea") {
    return (
      <div className="relative">
        <label
          htmlFor={name}
          className="text-base-content bg-base-300 absolute -top-2 left-2 z-10 inline-block rounded-lg px-1 text-xs font-medium"
        >
          {label}
        </label>
        <textarea
          name={name}
          id={name}
          placeholder={label}
          value={value}
          onChange={handleChange}
          className="input relative z-0 min-h-32 w-full rounded-md border p-2"
        />
      </div>
    );
  } else if (type === "select") {
    return (
      <div className="relative">
        <label
          htmlFor={name}
          className="text-base-content bg-base-300 absolute -top-2 left-2 z-10 inline-block rounded-lg px-1 text-xs font-medium"
        >
          {label}
        </label>
        <select
          autoComplete={"true"}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className="input relative z-0 w-full rounded-md border p-2"
        >
          <option value="">{label}</option>
          {options &&
            options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
        </select>
      </div>
    );
  } else {
    return (
      <div className="relative">
        <label
          htmlFor={name}
          className="text-base-content bg-base-300 absolute -top-2 left-2 z-10 inline-block rounded-lg px-1 text-xs font-medium"
        >
          {label}
        </label>
        <input
          autoComplete={"true"}
          type={type}
          name={name}
          id={name}
          placeholder={label}
          value={value}
          onChange={handleChange}
          className="input relative z-0 w-full rounded-md border p-2"
        />
      </div>
    );
  }
}
