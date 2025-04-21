"use client";

import DatePickerWithRange from "@/app/_components/custom-date-picker/custom-date-picker";
import CustomInput from "@/app/_components/custom-input/custom-input";
import { CustomSelect } from "@/app/_components/custom-select/custom-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApiStore } from "@/stores/api-store";
import { usePatrolFilterStore } from "@/stores/patrol-filter-store";
import { PatrolState } from "@/types/patrol/patrol";
import { isValidDate } from "@/utils/utils";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Filter = () => {
  const router = useRouter();
  const queryParams = new URLSearchParams();
  const { setQueryParams } = useApiStore();
  const {
    state,
    duration,
    carNumber,
    setState,
    setDuration,
    setCarNumber,
    setPage,
    setFilterReset,
  } = usePatrolFilterStore();

  const onSearch = (searchCarNumber?: string) => {
    if (state) queryParams.append("patrolNm", state);
    if (isValidDate(duration?.from) && duration?.from)
      queryParams.append("startDate", duration?.from.toISOString());
    if (isValidDate(duration?.to) && duration?.to)
      queryParams.append("endDate", duration.to.toISOString());

    // 2) 값이 있으면 carNumber를 쿼리에 추가
    if (searchCarNumber) {
      // console.log("검색함수 : ", searchCarNumber);
      queryParams.append("carNumber", searchCarNumber);
    } else if (!searchCarNumber && carNumber)
      queryParams.append("carNumber", carNumber);

    setPage(1);

    const url = `/patrol/?${queryParams}`;
    setQueryParams(queryParams.toString());
    router.push(url);
  };

  const handleEnterKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key === "NumpadEnter");
    if (e.key !== "Enter" && e.key !== "NumpadEnter") return;

    onSearch(e.currentTarget.value);
  };

  return (
    <div className="container max-w-full px-10">
      <Card className="h-fit">
        <CardHeader className="flex-row items-center">
          <CardTitle>조회 조건</CardTitle>
          <RotateCcw
            size={15}
            className="text-muted-foreground hover:cursor-pointer hover:text-black"
            onClick={setFilterReset}
          />
        </CardHeader>
        <CardContent className="flex gap-8 w-[800px]">
          <DatePickerWithRange
            label="기간"
            option={true}
            values={duration}
            onChange={setDuration}
          />
          <CustomSelect
            label="순찰상태"
            values={PatrolState}
            defaultValue={state}
            onChange={setState}
          />
          <CustomInput
            label="차량번호"
            value={carNumber}
            onChange={setCarNumber}
            onKeyDown={(e) => handleEnterKey(e)}
          />
          <div className="flex items-end">
            <Button
              className="w-full text-xs  hover:cursor-pointer"
              onClick={() => onSearch()}
            >
              조회
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Filter;
