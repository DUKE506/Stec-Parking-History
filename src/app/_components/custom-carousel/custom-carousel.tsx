import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Image from "next/image";

export const CustomCarousel = ({ urls }: { urls: string[] }) => {
  return (
    <div className="w-full">
      <Carousel className="w-full ">
        <CarouselContent>
          {Array.from({ length: urls?.length }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Image
                  src={urls[index]}
                  alt="이미지"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-6 cursor-pointer" />
        <CarouselNext className="right-6 cursor-pointer" />
      </Carousel>
    </div>
  );
};
