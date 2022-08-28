import { FC } from "react";

interface InputProps {
  label?: string;
  errorMsg?: string;
  htmlProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  className?: string;
}

export const Input: FC<InputProps> = ({
  label,
  htmlProps,
  className,
  errorMsg,
}) => {
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      {label && <label className="text-sm font-bold">{label}</label>}
      <input className="styled-input" {...htmlProps} />
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
    </div>
  );
};
