"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { DateRange } from "react-day-picker";
import { ko } from "date-fns/locale";
import { CardDescription } from "@/components/ui/card";

const DatePickerWithRange = ({
  className,
  label,
}: {
  className?: React.HTMLAttributes<HTMLDivElement>;
  label: string;
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className="flex flex-col gap-2">
      <CardDescription>{label}</CardDescription>
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
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
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              locale={ko}
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>

    // <div className="flex flex-col gap-2">
    //   <CardDescription>{label}</CardDescription>
    //   <div className={cn("grid gap-2", className)}>
    //     <Popover>
    //       <PopoverTrigger asChild>
    //         <Button
    //           id="date"
    //           variant={"outline"}
    //           className={cn(
    //             "w-[300px] justify-start text-left font-normal",
    //             !date && "text-muted-foreground"
    //           )}
    //         >
    //           <CalendarIcon />
    //           {date?.from ? (
    //             date.to ? (
    //               <>
    //                 {format(date.from, "y년 MM월 dd일")} -{" "}
    //                 {format(date.to, "y년 MM월 dd일")}
    //               </>
    //             ) : (
    //               format(date.from, "y년 MM월 dd일")
    //             )
    //           ) : (
    //             <span>Pick a date</span>
    //           )}
    //         </Button>
    //       </PopoverTrigger>
    //       <PopoverContent className="w-auto p-0" align="start">
    //         <Calendar
    //           initialFocus
    //           locale={ko}
    //           mode="range"
    //           defaultMonth={date?.from}
    //           selected={date}
    //           onSelect={setDate}
    //           numberOfMonths={2}
    //         />
    //       </PopoverContent>
    //     </Popover>
    //   </div>
    // </div>
  );
};

export default DatePickerWithRange;
