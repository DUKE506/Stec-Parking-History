"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import LucideIcon from "../lucide-icon/lucide-icon";
import { Label } from "@/components/ui/label";

const CustomSheet = ({ label }: { label: string }) => {
  const side = "right";
  return (
    <Sheet key={side}>
      <SheetTrigger asChild>
        <div className="flex gap-1">
          <Label className="text-xs">더보기</Label>
          <LucideIcon name="ArrowRight" size={16} />
        </div>
      </SheetTrigger>

      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>07가4991</SheetTitle>
          <div className="flex justify-between">
            <SheetDescription>최근 7일</SheetDescription>
            <SheetDescription>(기준 2025-03-14)</SheetDescription>
          </div>
        </SheetHeader>

        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;
