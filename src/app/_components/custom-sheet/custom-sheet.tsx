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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <SheetContent side={side} className="px-8">
        <SheetHeader className="px-0">
          <SheetTitle>07가4991</SheetTitle>
          <div className="flex justify-between">
            <SheetDescription>최근 7일</SheetDescription>
            <SheetDescription>(기준 2025-03-14)</SheetDescription>
          </div>
        </SheetHeader>
        <VisitLogCard type={true} />
        <VisitLogCard type={false} />
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;

export const VisitLogCard = ({ type }: { type: boolean }) => {
  const backgroundColor = type ? "bg-blue-500" : "bg-destructive";

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <CardTitle>2023-03-10 09:01:12</CardTitle>
        <Badge className={`${backgroundColor}`}>{type ? "입차" : "출차"}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <LogItem label="초소" value="정문" />
        <LogItem label="입출유형" value="정기차량" />
        <LogItem label="방문지" value="101동 1101호" />
      </CardContent>
    </Card>
  );
};

export const LogItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
};
