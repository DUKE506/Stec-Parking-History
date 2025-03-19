import { CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const CustomInput = ({
  label,
  onChange,
}: {
  label: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <CardDescription>{label}</CardDescription>
      <Input className="w-full" onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default CustomInput;
