import { ChangeEvent, CSSProperties } from "react";

interface CheckboxProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  title?: string;
  indeterminate?: boolean;
  style?: CSSProperties;
  className?: string;
  role?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ onChange, checked }) => {
  return <input type="checkbox" onChange={onChange} checked={checked} />;
};
