import type { ChangeEvent } from 'react';
import './TextField.css';

interface CTextFieldProps {
  hint: string;
  value: string;
  onChange: (value: string) => void;
  maxLines?: number;
  type?: 'text' | 'tel' | 'number';
  digitsOnly?: boolean;
}

export default function CTextField({
  hint,
  value,
  onChange,
  maxLines = 1,
  type = 'text',
  digitsOnly = false,
}: CTextFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let next = e.target.value;
    if (digitsOnly) next = next.replace(/\D/g, '');
    onChange(next);
  };

  if (maxLines > 1) {
    return (
      <textarea
        className="c-textfield c-textfield--area"
        placeholder={hint}
        value={value}
        onChange={handleChange}
        rows={maxLines}
      />
    );
  }

  return (
    <input
      className="c-textfield"
      placeholder={hint}
      value={value}
      onChange={handleChange}
      type={type}
      inputMode={digitsOnly ? 'numeric' : undefined}
    />
  );
}
