"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "../custom-select/custom-select";
import CustomInput from "../custom-input/custom-input";
import DatePickerWithRange from "../custom-date-picker/custom-date-picker";
import { Button } from "@/components/ui/button";

import { CarType, ParkingState } from "@/types/history/histroy";
import { useFilterStore } from "@/stores/filter-store";
import { useRouter, useSearchParams } from "next/navigation";

const FilterArea = () => {
  const router = useRouter();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams();
  const {
    carType,
    parkingState,
    carNumber,
    dong,
    ho,
    setCarType,
    setParkingState,
    setCarNumber,
    setStartDate,
    setEndDate,
    setDong,
    setHo,
  } = useFilterStore();

  const onSearch = () => {
    if (carType) queryParams.append("carType", carType);
    if (parkingState) queryParams.append("parkingState", parkingState);
    if (carNumber) queryParams.append("carNumber", carNumber);
    if (dong) queryParams.append("dong", dong);
    if (ho) queryParams.append("ho", ho);
    const url = `/?${queryParams}`;
    router.push(url);
  };

  return (
    <div className="container max-w-full px-10">
      <Card>
        <CardHeader>
          <CardTitle>검색 조건</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between gap-8 items-end">
          <CustomSelect
            label="입출유형"
            values={CarType}
            onChange={setCarType}
          />
          <CustomSelect
            label="주차상태"
            values={ParkingState}
            onChange={setParkingState}
          />

          <CustomInput label="차량번호" onChange={setCarNumber} />
          <DatePickerWithRange label="기간" />
          <CustomInput label="동" onChange={setDong} />
          <CustomInput label="호" onChange={setHo} />
          <div className="flex items-center">
            <Button onClick={onSearch}>조회</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterArea;
