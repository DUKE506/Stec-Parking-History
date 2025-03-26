"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
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
import { GateLog } from "@/types/history/history-info";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";
import { useHistoryInfoStore } from "@/stores/history-info-store";

const CustomSheet = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  const { currentHistory } = useHistoryStore();
  const { currentHistoryLog, loading } = useHistoryInfoStore();

  const side = "right";
  return (
    <Sheet key={side}>
      <SheetTrigger asChild onClick={onClick}>
        <div className="flex gap-1 hover:cursor-pointer">
          <Label className="text-xs hover:cursor-pointer">
            {label ?? "더보기"}
          </Label>
          <LucideIcon name="ArrowRight" size={16} />
        </div>
      </SheetTrigger>
      <SheetContent side={side} className="pt-8">
        <SheetHeader className="px-8 py-0">
          <SheetTitle>{currentHistory?.carNum}</SheetTitle>
          <div className="flex justify-between">
            <SheetDescription>최근 7일</SheetDescription>
            <SheetDescription className="text-xs flex items-end">
              기준 {dayjs(currentHistory?.inDtm).format("YYYY-MM-DD")}
            </SheetDescription>
          </div>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-8 overflow-auto pb-8">
          {/**
           * 스크롤 문제 해결해야할 느낌
           */}
          {loading
            ? Array(4)
                .fill(0)
                .map((_, idx) => {
                  return (
                    <Skeleton
                      key={idx}
                      className="h-[170px] w-full rounded-xl bg-input"
                    />
                  );
                })
            : currentHistoryLog?.map((gateLog) => {
                return (
                  <VisitLogCard
                    data={gateLog}
                    key={gateLog.pId}
                    type={gateLog.ioStatusTpNm == "입차" ? true : false}
                  />
                );
              })}
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
        <CardTitle>{dayjs(data.ioDtm).format("YYYY-MM-DD HH:mm:ss")}</CardTitle>
        <Badge className={`${backgroundColor}`}>{type ? "입차" : "출차"}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <LogItem label="초소" value={data.ioGateNm} />
        <LogItem label="입출유형" value={data.ioTicketTpNm} />
        <LogItem label="방문지" value={`${data.dong}동 ${data.ho}호`} />
      </CardContent>
    </Card>
  );
};

export const LogItem = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => {
  return (
    <div className="flex justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
};
