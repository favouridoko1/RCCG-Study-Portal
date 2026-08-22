import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingText?: string;
};

function Button({
  children,
  loading = false,
  loadingText = "Loading...",
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center
        bg-blue-950
        rounded-md px-4 py-2
        text-sm font-medium 
        cursor-pointer
        transition-colors
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {loading ? loadingText : children}
    </button>
  );
}

export default Button;