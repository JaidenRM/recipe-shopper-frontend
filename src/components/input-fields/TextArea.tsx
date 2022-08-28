import { FC } from "react";

interface TextAreaProps {
  label?: string;
  htmlProps?: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  className?: string;
  errorMsg?: string;
}

export const TextArea: FC<TextAreaProps> = ({
  label,
  htmlProps,
  className,
  errorMsg,
}) => {
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      {label && <label className="text-sm font-bold">{label}</label>}
      <textarea className="styled-input" {...htmlProps} />
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
    </div>
  );
};
