import { CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const CustomInput = ({
  label,
  value,
  placeholder,
  onChange,
  onKeyDown,
  ...field
}: {
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      onKeyDown?.(e);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <CardDescription>{label}</CardDescription>
      <Input
        className="w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        {...field}
      />
    </div>
  );
};

export default CustomInput;
