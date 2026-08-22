// components/FormInput.tsx

import React from "react";

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  description?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

function FormInput({
  label,
  error,
  description,
  id,
  className = "",
  icon,
  iconPosition = "left",
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span
            className={`absolute top-1/2 -translate-y-1/2 text-gray-500 ${
              iconPosition === "left" ? "left-3" : "right-3"
            }`}
          >
            {icon}
          </span>
        )}

        <input
          id={id}
          className={`
            w-full border px-3 py-2 bg-gray-100 text-sm
            outline-none transition
            placeholder:text-gray-500
            focus:ring-2 focus:ring-blue-500/20
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }
            disabled:cursor-not-allowed disabled:bg-gray-100
            ${icon && iconPosition === "left" ? "pl-10" : ""}
            ${icon && iconPosition === "right" ? "pr-10" : ""}
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${id}-error`
              : description
                ? `${id}-description`
                : undefined
          }
          {...props}
        />
      </div>

      {description && !error && (
        <p id={`${id}-description`} className="text-xs text-gray-500">
          {description}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormInput;