import { FC } from "react";

interface OptionProps {
  value: string;
  displayValue?: string;
  selected?: boolean;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  htmlProps?: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;
  className?: string;
  errorMsg?: string;
  options: OptionProps[];
}

export const Select: FC<SelectProps> = ({
  label,
  htmlProps,
  className,
  options,
  errorMsg,
}) => {
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      {label && <label className="text-sm font-bold">{label}</label>}
      <select className="styled-input" {...htmlProps}>
        {options.map((opt, i) => (
          <option
            value={opt.value}
            disabled={opt.disabled}
            selected={opt.selected}
            key={i}
          >
            {opt.displayValue ?? opt.value}
          </option>
        ))}
      </select>
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
    </div>
  );
};
