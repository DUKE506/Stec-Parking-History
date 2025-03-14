import { icons } from "lucide-react";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LucideInconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: keyof typeof icons;
  size?: number;
  strokeWidth?: number;
}

const LucideIcon = ({
  name,
  color = "gr4",
  size = 18,
  strokeWidth = 1.5,
  ...props
}: LucideInconProps) => {
  const LucideIncon = icons[name];

  const isClickEvent = !!props.onClick;
  const pointerStyle = isClickEvent ? "cursor-pointer" : "";
  return (
    <LucideIncon
      size={size}
      strokeWidth={strokeWidth}
      className={cn(pointerStyle, props.className)}
      {...props}
    />
  );
};

export default LucideIcon;
