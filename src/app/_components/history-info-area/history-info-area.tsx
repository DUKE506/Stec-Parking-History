import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import CustomSheet from "../custom-sheet/custom-sheet";
import { useHistoryStore } from "@/stores/histories-store";
import { ParkingState } from "@prisma/client";
import CustomTextAreaForm from "../custom-text-area/custom-textarea";
import dayjs from "dayjs";
import { useHistoryInfoStore } from "@/stores/history-info-store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CustomCarousel } from "../custom-carousel/custom-carousel";
export const ImageArea = ({
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
        <CardDescription>
          {label}
        </CardDescription>

        <span className="text-xs">{time}</span>
      </div>
      <div className="relative h-full rounded-sm overflow-hidden max-h-[173.5px] min-h-[173.5px]">
        {url ? <Image src={url} alt="이미지" fill /> : null}
      </div>
    </div>
  );
};

/**
 * 이미지는 다이얼로그는 캐러샐로 구현
 * @returns
 */
const HistoryInfoArea = () => {
  const { currentHistory, setHistoryNote } = useHistoryStore();
  const [isOpen, setIsOpen] = useState(false);
  const { fetchWeekLogs } = useHistoryInfoStore();
  const [Images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (currentHistory && currentHistory.entryImage) {
      // 배열에 이미지 추가
      setImages([currentHistory.entryImage]);

      // 출차 이미지가 있으면 추가
      if (currentHistory.exitImage) {
        setImages([currentHistory.entryImage, currentHistory.exitImage]);
      }
    }
  }, [currentHistory]);

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
          <Dialog>
            <DialogTrigger className="hover:cursor-pointer">
              <ImageArea
                label="입차"
                time={dayjs(currentHistory.entryTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
                url={currentHistory.entryImage}
              />
            </DialogTrigger>

            <DialogContent className="lg:max-w-[60vw]">
              <DialogHeader>
                <DialogTitle>이미지</DialogTitle>
              </DialogHeader>
              <CustomCarousel urls={Images} />
            </DialogContent>
          </Dialog>

          {currentHistory.parkingState === ParkingState.출차 ? (
            <Dialog>
              <DialogTrigger className="hover:cursor-pointer">
                <ImageArea
                  label="출차"
                  time={dayjs(currentHistory.exitTime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  url={currentHistory.exitImage}
                />
              </DialogTrigger>

              <DialogContent className="lg:max-w-[60vw]">
                <DialogHeader>
                  <DialogTitle>이미지</DialogTitle>
                </DialogHeader>
                <CustomCarousel urls={Images} />
              </DialogContent>
            </Dialog>
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
