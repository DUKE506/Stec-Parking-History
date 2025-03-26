"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { ko } from "date-fns/locale";
import { CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { isValidDate } from "@/utils/utils";

const DatePickerWithRange = ({
  className,
  label,
  option = false,
  values,
  onChange,
}: {
  // className?: React.HTMLAttributes<HTMLDivElement>;
  className?: string;
  label: string;
  option?: boolean;
  values: DateRange | null;
  onChange: (duration: DateRange | null) => void;
}) => {
  const [isSwitch, setSwitch] = useState<boolean>(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(Date.now()), 20),
    to: new Date(Date.now()),
  });

  useEffect(() => {
    if (values === null) {
      setSwitch(false);
      setDate({
        from: subDays(new Date(Date.now()), 20),
        to: new Date(Date.now()),
      });
      return;
    }
    setDate(date);
    if (isValidDate(values?.from) && isValidDate(values?.to)) {
      setSwitch(true);
      setDate({
        from: values?.from,
        to: values?.to,
      });
    }
  }, [values]);

  //스위치 핸들러
  const onSwitchHandle = (change: boolean) => {
    setSwitch(change);
    if (!change) {
      onChange(null);
    } else if (change && date) {
      // console.log("스위치 :", change, "데이트 : ", date);
      onChange(date);
    } else {
      onChange(null);
    }
  };

  //날짜선택 핸들러
  const onSelectedDate = (e: DateRange | undefined) => {
    // 시간을 정오로 설정하여 시간대 문제 방지
    if (e?.from) e.from.setHours(12, 0, 0, 0);
    if (e?.to) e.to.setHours(12, 0, 0, 0);
    setDate(e);
    if (e) onChange(e);
    else onChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <CardDescription className="flex gap-2 items-end">
        {label}
        {option ? (
          <Switch
            className="hover:cursor-pointer"
            checked={isSwitch}
            onCheckedChange={(e) => onSwitchHandle(e)}
          />
        ) : null}
      </CardDescription>

      <div className={cn("grid gap-2", className)}>
        <Popover>
          {isSwitch ? (
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal hover:cursor-pointer ",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "y년 MM월 dd일")} -{" "}
                      {format(date.to, "y년 MM월 dd일")}
                    </>
                  ) : (
                    format(date.from, "y년 MM월 dd일")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
          ) : (
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              전체
            </Button>
          )}

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              locale={ko}
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(e) => onSelectedDate(e)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DatePickerWithRange;
