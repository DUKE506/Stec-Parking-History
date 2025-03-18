import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect } from "react";
import Image from "next/image";
import car from "../../../../public/차량번호판 인식사진.jpg";
import { Badge } from "@/components/ui/badge";
import CustomSheet from "../custom-sheet/custom-sheet";
import { useHistoryStore } from "@/stores/histories-store";
import { ParkingState } from "@prisma/client";
import CustomTextAreaForm from "../custom-text-area/custom-textarea";
import dayjs from "dayjs";
import { useHistoryInfoStore } from "@/stores/history-info-store";
const ImageArea = ({
  label,
  time,
  url,
}: {
  label: string;
  time: string | null;
  url?: string | null;
}) => {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between ">
        <span className="text-sm">{label}</span>
        <span className="text-xs">{time}</span>
      </div>
      <div className="relative h-full rounded-sm overflow-hidden max-h-[173.5px] min-h-[173.5px]">
        {url != null ? <Image src={url} alt="이미지" fill /> : null}
      </div>
    </div>
  );
};

const HistoryInfoArea = () => {
  const { currentHistory, setHistoryNote } = useHistoryStore();
  const { fetchWeekLogs } = useHistoryInfoStore();

  return (
    <Card className="flex-1 h-full">
      <CardHeader className="flex-row justify-between">
        <CardTitle>{currentHistory?.carNumber} 정보</CardTitle>
        {currentHistory !== null ? (
          <CustomSheet
            label="더보기"
            onClick={() => fetchWeekLogs(currentHistory)}
          />
        ) : null}
      </CardHeader>
      {currentHistory !== null ? (
        <CardContent className="flex flex-col gap-4 h-full overflow-auto">
          <ImageArea
            label="입차"
            time={dayjs(currentHistory.entryTime).format("YYYY-MM-DD HH:mm:ss")}
            url={currentHistory.entryImage}
          />
          {currentHistory.parkingState === ParkingState.OUT ? (
            <ImageArea
              label="출차"
              time={dayjs(currentHistory.exitTime).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
              url={currentHistory.exitImage}
            />
          ) : null}
          <CustomTextAreaForm
            key={currentHistory.id}
            label="비고"
            placeholder="특이사항을 입력하세요"
            value={currentHistory.note ?? undefined}
            setValue={(value) => {
              currentHistory.note = value;
              setHistoryNote(currentHistory);
            }}
          />
        </CardContent>
      ) : null}
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
