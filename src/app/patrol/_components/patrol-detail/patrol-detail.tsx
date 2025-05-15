import { CustomCarousel } from "@/app/_components/custom-carousel/custom-carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatrolStore } from "@/stores/patrol-store";
import { Patrol } from "@/types/patrol/patrol";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export const PatrolDetail = () => {
  const { currentPatrol } = usePatrolStore();

  return (
    <Card className="min-w-[350px] h-fit min-h-[367px] sticky top-6">
      <CardHeader>
        <CardTitle>{currentPatrol?.carNum} 순찰 정보</CardTitle>
      </CardHeader>
      {currentPatrol === null ? (
        <div></div>
      ) : (
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Dialog>
              <DialogTrigger className={`${currentPatrol.patrolImg ? 'hover:cursor-pointer' : ""}`}>
                <ImageArea data={currentPatrol} />
              </DialogTrigger>
              {currentPatrol.patrolImg ? (
                <DialogContent className="lg:max-w-[60vw]">
                  <DialogHeader>
                    <DialogTitle>이미지</DialogTitle>
                  </DialogHeader>
                  <CustomCarousel urls={[currentPatrol.patrolImg]} />
                </DialogContent>
              ) : null}
            </Dialog>
            <CardDescription>비고</CardDescription>
            <div className="text-sm">{currentPatrol.patrolRemark}</div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export const ImageArea = ({ data }: { data: Patrol }) => {
  const [imageError, setImageError] = useState<boolean>(false)
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between">
        <CardDescription>이미지</CardDescription>
        <span className="text-xs">
          {dayjs(data.patrolDtm).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      </div>
      {imageError && data.patrolImg ? (
        <div className="relative h-full rounded-sm overflow-hidden max-h-[173.5px] min-h-[173.5px]">
          <Image src={data.patrolImg} alt="이미지" fill onError={()=>setImageError(true)}/>
          </div>
      ) : <div className="bg-gray-50 min-h-[173.5px] rounded-md flex justify-center items-center"><ImageIcon className="text-gray-300"/></div>}
    </div>
  );
};
