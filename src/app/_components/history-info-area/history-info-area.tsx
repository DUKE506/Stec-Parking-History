"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import CustomSheet from "../custom-sheet/custom-sheet";
import { useHistoryStore } from "@/stores/histories-store";
import CustomTextAreaForm from "../custom-text-area/custom-textarea";
import dayjs from "dayjs";
import { useHistoryInfoStore } from "@/stores/history-info-store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomCarousel } from "../custom-carousel/custom-carousel";
import { ParkingState } from "@/types/history/histroy";
import { ImageIcon } from "lucide-react";

/**
 * 이미지는 다이얼로그는 캐러샐로 구현
 * @returns
 */
const HistoryInfoArea = () => {
  const { currentHistory, setHistoryNote } = useHistoryStore();

  const { fetchWeekLogs } = useHistoryInfoStore();
  const [Images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (currentHistory && currentHistory.inDtm && currentHistory.inImagePath) {
      // 배열에 이미지 추가
      setImages([currentHistory.inImagePath]);

      // 출차 이미지가 있으면 추가
      if (currentHistory.outDtm && currentHistory.outImagePath) {
        setImages([currentHistory.inImagePath, currentHistory.outImagePath]);
      }
    }
  }, [currentHistory]);

  return (
    <Card className="min-w-[350px] h-fit min-h-[367px] sticky top-6">
      <CardHeader className="flex-row justify-between">
        <CardTitle>{currentHistory?.carNum} 정보</CardTitle>
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
                time={dayjs(currentHistory.inDtm).format("YYYY-MM-DD HH:mm:ss")}
                url={currentHistory.inImagePath}
              />
            </DialogTrigger>

            <DialogContent className="lg:max-w-[60vw]">
              <DialogHeader>
                <DialogTitle>이미지</DialogTitle>
              </DialogHeader>
              <CustomCarousel urls={Images} />
            </DialogContent>
          </Dialog>

          {currentHistory.ioStatusTpNm === ParkingState.OUT ? (
            <Dialog>
              <DialogTrigger className="hover:cursor-pointer">
                <ImageArea
                  label="출차"
                  time={dayjs(currentHistory.outDtm).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  url={currentHistory.outImagePath}
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
            key={currentHistory.pId}
            label="비고"
            placeholder="특이사항을 입력하세요"
            value={currentHistory.memo ?? undefined}
            setValue={(value) => {
              currentHistory.memo = value;
              setHistoryNote(currentHistory);
            }}
          />
        </CardContent>
      ) : null}
    </Card>
  );
};

export default HistoryInfoArea;

export const ImageArea = ({
  label,
  time,
  url,
}: {
  label: string;
  time: string | null;
  url?: string | null;
}) => {
  const [imageError, setImageError] = useState<boolean>(false)
  
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between ">
        <CardDescription>{label}</CardDescription>

        <span className="text-xs">{time}</span>
      </div>
      <div className="relative h-full rounded-sm overflow-hidden max-h-[173.5px] min-h-[173.5px]">
      {imageError && url ? <Image src={url} alt="이미지" fill onError={()=>setImageError(true)} /> : <div className="bg-gray-50 min-h-[173.5px] rounded-md flex justify-center items-center"><ImageIcon className="text-gray-300"/></div>}
      </div>
    </div>
  );
};
