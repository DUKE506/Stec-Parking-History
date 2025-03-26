"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "../custom-select/custom-select";
import CustomInput from "../custom-input/custom-input";
import DatePickerWithRange from "../custom-date-picker/custom-date-picker";
import { Button } from "@/components/ui/button";

import { CarType, ParkingState } from "@/types/history/histroy";
import { useFilterStore } from "@/stores/filter-store";
import { useRouter } from "next/navigation";

import { useApiStore } from "@/stores/api-store";
import { RotateCcw } from "lucide-react";
import { isValidDate } from "@/utils/utils";

const FilterArea = () => {
  const router = useRouter();
  const queryParams = new URLSearchParams();

  const {
    carType,
    parkingState,
    carNumber,
    duration,
    dong,
    ho,
    setCarType,
    setParkingState,
    setCarNumber,
    setDuration,
    setDong,
    setHo,
    setPage,
    setFilterReset,
  } = useFilterStore();

  const { setQueryParams } = useApiStore();

  const handleEnterKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" && e.key !== "NumpadEnter") return;
    onSearch();
  };

  const onSearch = () => {
    if (carType) queryParams.append("ioTicketTpNm", carType);
    if (parkingState) queryParams.append("ioStatusTpNm", parkingState);
    if (carNumber) queryParams.append("carNumber", carNumber);
    if (isValidDate(duration?.from) && duration?.from)
      queryParams.append("startDate", duration?.from.toString());
    if (isValidDate(duration?.to) && duration?.to)
      queryParams.append("endDate", duration.to.toString());
    if (dong) queryParams.append("dong", dong);
    if (ho) queryParams.append("ho", ho);
    setPage(1);

    const url = `/?${queryParams}`;
    setQueryParams(queryParams.toString());
    router.push(url);
  };

  return (
    <div className="container max-w-full px-10">
      <Card>
        <CardHeader className="flex-row items-center">
          <CardTitle>검색 조건</CardTitle>
          <RotateCcw
            size={15}
            className="text-muted-foreground hover:cursor-pointer hover:text-black"
            onClick={setFilterReset}
          />
        </CardHeader>
        <CardContent className="flex justify-between gap-8 items-end ">
          <CustomSelect
            label="입출유형"
            values={CarType}
            defaultValue={carType}
            onChange={setCarType}
          />
          <CustomSelect
            label="주차상태"
            values={ParkingState}
            defaultValue={parkingState}
            onChange={setParkingState}
          />

          <CustomInput
            label="차량번호"
            value={carNumber}
            onChange={setCarNumber}
            onKeyDown={(e) => handleEnterKey(e)}
          />
          <DatePickerWithRange
            label="기간"
            option={true}
            values={duration}
            onChange={setDuration}
          />
          <CustomInput
            label="동"
            value={dong}
            onChange={setDong}
            onKeyDown={(e) => handleEnterKey(e)}
          />
          <CustomInput
            label="호"
            value={ho}
            onChange={setHo}
            onKeyDown={(e) => handleEnterKey(e)}
          />
          <div className="flex items-center">
            <Button className="hover:cursor-pointer" onClick={onSearch}>
              조회
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterArea;
