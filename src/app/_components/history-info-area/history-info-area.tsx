import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import car from "../../../../public/차량번호판 인식사진.jpg";
import { Badge } from "@/components/ui/badge";
import CustomSheet from "../custom-sheet/custom-sheet";

const ImageArea = ({ label, time }: { label: string; time: string }) => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between ">
        <span className="text-sm">{label}</span>
        <span className="text-xs">{time}</span>
      </div>
      <div className="relative h-full rounded-sm overflow-hidden">
        <Image src={car} alt="이미지" fill />
      </div>
    </div>
  );
};

const HistoryInfoArea = () => {
  return (
    <Card className="flex-1 h-full">
      <CardHeader className="flex-row justify-between">
        <CardTitle>입출차 정보</CardTitle>
        <CustomSheet label="더보기" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 h-full">
        <ImageArea label="입차" time="2025-03-14 11:04:12" />
        <ImageArea label="출차" time="2025-03-14 15:37:53" />
      </CardContent>
    </Card>
  );
};

export default HistoryInfoArea;

const HistoryItem = ({ time, type }: { time: string; type: boolean }) => {
  const backgroundColor = type ? "bg-blue-500" : "bg-destructive";
  return (
    <div className="flex justify-between">
      <span>{time}</span>
      <Badge className={`${backgroundColor}`}>{type ? "입차" : "출차"}</Badge>
    </div>
  );
};
