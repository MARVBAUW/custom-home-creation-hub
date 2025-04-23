
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  isAdmin?: boolean;
}

const FormField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
  className = '',
  isAdmin = false,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input 
        id={id} 
        type={type} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border-gray-300 focus:ring-khaki-500 focus:border-khaki-500 ${
          isAdmin ? 'bg-amber-50 border-amber-200' : ''
        } ${className}`}
        disabled={disabled}
      />
    </div>
  );
};

export default FormField;
