"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomInput from "../custom-input/custom-input";
import DatePickerWithRange from "../custom-date-picker/custom-date-picker";
import { EnumType } from "@/types/type";
import { CarType, ParkingState } from "@prisma/client";
import { switchCarTypeKR, switchParkingStateKR } from "@/lib/utils";

const CustomSelect = <T extends EnumType>({
  label,
  values,
  valueConvert,
}: {
  label: string;
  values: T;
  valueConvert: (value: any) => string;
}) => {
  const getEnumValues = (enumObject: T): { name: string; value: string }[] => {
    return Object.keys(enumObject)
      .filter((key) => isNaN(Number(key)))
      .map((key) => ({
        name: key,
        value: enumObject[key].toString(),
      }));
  };

  const enumValues = getEnumValues(values);

  return (
    <div className="flex flex-col gap-2 w-full">
      <CardDescription>{label}</CardDescription>
      <Select>
        {/* <SelectTrigger className="w-[180px]"> */}
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {}
          {/* {key:value}형태로  */}
          {enumValues.map((item) => {
            const displayName = valueConvert(item.name);
            return (
              <SelectItem key={item.value} value={item.value}>
                {displayName}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

const FilterArea = () => {
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
            valueConvert={switchCarTypeKR}
          />
          <CustomSelect
            label="주차상태"
            values={ParkingState}
            valueConvert={switchParkingStateKR}
          />
          <CustomInput label="차량번호" />
          <DatePickerWithRange label="기간" />
          <CustomInput label="동" />
          <CustomInput label="호" />
          <div className="flex items-center">
            <Button>조회</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterArea;
