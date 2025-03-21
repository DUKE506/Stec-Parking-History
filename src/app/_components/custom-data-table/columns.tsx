"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CarType, History, ParkingState } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Circle } from "lucide-react";
import dayjs from "dayjs";

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "carType",
    header: () => <div className="text-center">입출유형</div>,
  },
  {
    accessorKey: "parkingState",
    header: () => <div className="text-center">차량상태</div>,
    cell: ({ row }) => {
      const value = row.getValue("parkingState") as ParkingState;
      let backgroundColor = "bg-muted-foreground";
      switch (value) {
        case ParkingState.입차:
          backgroundColor = "bg-blue-500";
          break;
        case ParkingState.출차:
          backgroundColor = "bg-destructive";
          break;
      }

      return (
        <div className="text-center">
          <Badge className={`${backgroundColor}`}>{value}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "carNumber",
    // header: '차량번호',
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            차량번호
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("carNumber") as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "entryTime",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            입차일시
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const value = row.original.entryTime;
      if (!value) {
        return <div className="text-center"></div>;
      }

      const formatValue = dayjs(value).format("YYYY-MM-DD HH:mm:ss");

      return <div className="text-center">{formatValue}</div>;
    },
  },
  {
    accessorKey: "exitTime",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            출차일시
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const value = row.original.exitTime;
      if (!value) {
        return <div className="text-center"></div>;
      }

      const formatValue = dayjs(value).format("YYYY-MM-DD HH:mm:ss");

      return <div className="text-center">{formatValue ?? ""}</div>;
    },
  },
  {
    accessorKey: "totalTime",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            주차시간
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("totalTime") as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "parkingAreaName",
    header: () => <div className="text-center">주차장명</div>,
    cell: ({ row }) => {
      const value = row.getValue("parkingAreaName") as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "entryArea",
    header: () => <div className="text-center">입차초소</div>,
    cell: ({ row }) => {
      const value = row.getValue("entryArea") as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "exitArea",
    header: () => <div className="text-center">출차초소</div>,
    cell: ({ row }) => {
      const value = row.getValue("entryArea") as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "dong",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            동
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("dong") as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "ho",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            호
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("ho") as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "isBlack",
    header: "블랙",
    cell: ({ row }) => {
      const value = row.getValue("isBlack");
      const returnValue = value ? (
        <Circle className="text-destructive" size={20} />
      ) : null;
      return (
        <div>
          <div className="flex justify-center">{returnValue}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "note",
    header: () => <div className="text-center">비고</div>,
    cell: ({ row }) => {
      const value = row.getValue("note") as string;
      const returnValue = value ? (
        <Check className="text-blue-500" size={20} />
      ) : null;
      return <div className="flex justify-center">{returnValue}</div>;
    },
  },
];
