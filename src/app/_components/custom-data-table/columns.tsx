"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { switchCarTypeKR } from "@/lib/utils";
import { CarType, History, ParkingState } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Circle } from "lucide-react";

export type ParkingHistory = {
  id: string;
  carType: string;
  parkingType: string;
  carNumber: string;
  entryTime: string;
  exitTime: string | null;
  totalTime: string | null;
  parkingAreaName: string | null;
  entryArea: string;
  exitArea: string | null;
  dong: string | null;
  ho: string | null;
  isBlack: boolean;
  note: string | null;
};

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "carType",
    header: "입출유형",
    cell: ({ row }) => {
      const value = row.getValue('carType') as CarType
      return switchCarTypeKR(value);
    }
  },
  {
    accessorKey: "parkingState",
    header: "차량상태",
    cell: ({ row }) => {
      const value = row.getValue("parkingState") as ParkingState;
      let backgroundColor = "bg-muted-foreground"
      switch (value) {
        case ParkingState.IN:
          backgroundColor = "bg-blue-500";
          break
        case ParkingState.OUT:
          backgroundColor = "bg-destructive";
          break;
      };

      return <Badge className={`${backgroundColor}`}>{value}</Badge>
    }
  },
  {
    accessorKey: "carNumber",
    // header: '차량번호',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          차량번호
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "entryTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          입차일시
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "exitTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          출차일시
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "totalTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          주차시간
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "parkingAreaName",
    header: "주차장명",
  },
  {
    accessorKey: "entryArea",
    header: "입차초소",
  },
  {
    accessorKey: "exitArea",
    header: "출차초소",
  },
  {
    accessorKey: "dong",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          동
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "ho",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          호
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isBlack",
    header: "블랙",
    cell: ({ row }) => {
      const value = row.getValue("isBlack");
      const returnValue = value ? <Circle color="red" size={20} /> : null;
      return (
        <div>
          <div className="flex justify-center">{returnValue}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "note",
    header: "비고",
  },
];
