import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "../custom-select/custom-select";
import CustomInput from "../custom-input/custom-input";
import DatePickerWithRange from "../custom-date-picker/custom-date-picker";
import { Button } from "@/components/ui/button";

import { switchCarTypeKR, switchParkingStateKR } from "@/lib/utils";
import { CarType, ParkingState } from "@/types/history/histroy";

const FilterArea = () => {
  return (
    <div className="container max-w-full px-10">
      <Card>
        <CardHeader>
          <CardTitle>검색 조건</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between gap-8 items-end">
          <CustomSelect label="입출유형" values={CarType} />
          <CustomSelect label="주차상태" values={ParkingState} />

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
