import { CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

const CustomInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <CardDescription>{label}</CardDescription>
      <Input
        className="w-full"
        value={inputValue}
        onBlur={() => onChange(inputValue)}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default CustomInput;
