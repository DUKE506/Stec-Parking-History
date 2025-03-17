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
import { useHistoryStore } from "@/stores/histories-store";
import { GateLog } from "@prisma/client";
import dayjs from "dayjs";

const CustomSheet = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  const { currentHistoryLog } = useHistoryStore();
  const side = "right";
  return (
    <Sheet key={side}>
      <SheetTrigger asChild onClick={onClick}>
        <div className="flex gap-1">
          <Label className="text-xs">{label ?? "더보기"}</Label>
          <LucideIcon name="ArrowRight" size={16} />
        </div>
      </SheetTrigger>
      <SheetContent side={side} className="pt-8">
        <SheetHeader className="px-8 py-0">
          <SheetTitle>07가4991</SheetTitle>
          <div className="flex justify-between">
            <SheetDescription>최근 7일</SheetDescription>
            <SheetDescription>(기준 2025-03-14)</SheetDescription>
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-8 overflow-auto pb-8">
          {currentHistoryLog?.map((gateLog) => {
            return (
              <VisitLogCard
                data={gateLog}
                key={gateLog.id}
                type={gateLog.stateName == "입차" ? true : false}
              />
            );
          })}
          {/* <VisitLogCard type={true} />
          <VisitLogCard type={false} />
          <VisitLogCard type={true} />
          <VisitLogCard type={false} />
          <VisitLogCard type={true} />
          <VisitLogCard type={false} />
          <VisitLogCard type={true} />
          <VisitLogCard type={false} /> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;

/**
 * log 전용 컴포넌트
 * @param param0
 * @returns
 */
export const VisitLogCard = ({
  type,
  data,
}: {
  type: boolean;
  data: GateLog;
}) => {
  const backgroundColor = type ? "bg-blue-500" : "bg-destructive";

  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <CardTitle>{dayjs(data.time).format("YYYY-MM-DD HH:mm:ss")}</CardTitle>
        <Badge className={`${backgroundColor}`}>{type ? "입차" : "출차"}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <LogItem label="초소" value={data.gateName} />
        <LogItem label="입출유형" value={data.carTypeName} />
        <LogItem label="방문지" value={`${data.dong}동 ${data.ho}호`} />
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
