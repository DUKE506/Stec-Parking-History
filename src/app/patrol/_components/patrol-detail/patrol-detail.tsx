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
import { Patrol } from "@prisma/client";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

export const PatrolDetail = ({ data }: { data: Patrol }) => {
  return (
    <Card className="fixed bottom-10 w-[inherit] max-w-[inherit] h-[350px]">
      <CardHeader>
        <CardTitle>{data.carNumber} 순찰 정보</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Dialog>
            <DialogTrigger className="hover:cursor-pointer">
              <ImageArea data={data} />
            </DialogTrigger>
            {data.img ? (
              <DialogContent className="lg:max-w-[60vw]">
                <DialogHeader>
                  <DialogTitle>이미지</DialogTitle>
                </DialogHeader>
                <CustomCarousel urls={[data.img]} />
              </DialogContent>
            ) : null}
          </Dialog>
          <CardDescription>비고</CardDescription>
          <div className="text-sm">{data.note}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ImageArea = ({ data }: { data: Patrol }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <CardDescription>이미지</CardDescription>
        <span className="text-xs">
          {dayjs(data.time).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      </div>
      {data.img ? (
        <div className="relative rounded-sm overflow-hidden w-full h-full max-h-[150px] min-h-[150px]">
          <Image src={data.img} alt="이미지" fill />
        </div>
      ) : null}
    </div>
  );
};
