import { CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const CustomInput = ({ label }: { label: string }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <CardDescription>{label}</CardDescription>
      <Input className="w-full" />
    </div>
  );
};

export default CustomInput;
