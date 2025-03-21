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
import { PatrolState } from "@/types/patrol/patrol";
import { subDays } from "date-fns";
import React from "react";

const Filter = () => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>검색 조건</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <DatePickerWithRange
          label="기간"
          option={true}
          values={{
            from: subDays(new Date(Date.now()), 20),
            to: new Date(Date.now()),
          }}
          onChange={() => {}}
        />
        <CustomSelect label="순찰상태" values={PatrolState} />
        <CustomInput label="차량번호" value="" onChange={() => {}} />
      </CardContent>
      <CardFooter>
        <Button className="w-full">조회</Button>
      </CardFooter>
    </Card>
  );
};

export default Filter;
