"use client";

import DatePickerWithRange from "@/app/_components/custom-date-picker/custom-date-picker";
import CustomInput from "@/app/_components/custom-input/custom-input";
import { CustomSelect } from "@/app/_components/custom-select/custom-select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApiStore } from "@/stores/api-store";
import { usePatrolFilterStore } from "@/stores/patrol-filter-store";
import { PatrolState } from "@/types/patrol/patrol";
import { isValidDate } from "@/utils/utils";
import { subDays } from "date-fns";
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

  const onSearch = () => {
    if (state) queryParams.append("state", state);
    if (isValidDate(duration?.from) && duration?.from)
      queryParams.append("startDate", duration?.from.toString());
    if (isValidDate(duration?.to) && duration?.to)
      queryParams.append("endDate", duration.to.toString());
    if (carNumber) queryParams.append("carNumber", carNumber);

    setPage(1);

    const url = `/patrol/?${queryParams}`;
    setQueryParams(queryParams.toString());
    router.push(url);
  };

  return (
    <Card className="h-fit">
      <CardHeader className="flex-row items-center">
        <CardTitle>검색 조건</CardTitle>
        <RotateCcw
          size={15}
          className="text-muted-foreground hover:cursor-pointer hover:text-black"
          onClick={setFilterReset}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
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
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full hover:cursor-pointer" onClick={onSearch}>
          조회
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Filter;
