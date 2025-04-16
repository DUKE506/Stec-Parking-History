"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, Circle } from "lucide-react";
import { History } from "@/types/history/histroy";
import dayjs from "dayjs";
import { ParkingState, ParkingStateUnionType } from "@/types/history/histroy";

export const columns: ColumnDef<History>[] = [
  {
    accessorKey: "ioTicketTpNm",
    header: () => <div className="text-center">방문유형</div>,
    cell: ({ row }) => {
      const value = row.getValue("ioTicketTpNm") as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "ioStatusTpNm",
    header: () => <div className="text-center">차량상태</div>,
    cell: ({ row }) => {
      const value = row.getValue("ioStatusTpNm") as ParkingStateUnionType;
      let backgroundColor = "bg-muted-foreground";
      switch (value) {
        case ParkingState.IN:
          backgroundColor = "bg-blue-500";
          break;
        case ParkingState.OUT:
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
    accessorKey: "carNum",
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
      const value = row.getValue("carNum") as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "inDtm",
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
      const value = row.original.inDtm;
      if (!value) {
        return <div className="text-center"></div>;
      }

      const formatValue = dayjs(value).format("YYYY-MM-DD HH:mm:ss");

      return <div className="text-center">{formatValue}</div>;
    },
  },
  {
    accessorKey: "outDtm",
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
      const value = row.original.outDtm;
      if (!value) {
        return <div className="text-center"></div>;
      }

      const formatValue = dayjs(value).format("YYYY-MM-DD HH:mm:ss");

      return <div className="text-center">{formatValue ?? ""}</div>;
    },
  },
  {
    accessorKey: "parkingDuration",
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
      const value = row.getValue("parkingDuration") as string;
      return <div className="text-center">{value ? `${value}분` : null}</div>;
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
    accessorKey: "inGateNm",
    header: () => <div className="text-center">입차초소</div>,
    cell: ({ row }) => {
      const value = row.getValue("inGateNm") as string;
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "outGateNm",
    header: () => <div className="text-center">출차초소</div>,
    cell: ({ row }) => {
      const value = row.getValue("outGateNm") as string;
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
    accessorKey: "isBlacklist",
    header: "블랙",
    cell: ({ row }) => {
      const value = row.getValue("isBlacklist");
      const returnValue =
        value == "1" ? <Circle className="text-destructive" size={20} /> : null;
      return (
        <div>
          <div className="flex justify-center">{returnValue}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "memo",
    header: () => <div className="text-center">비고</div>,
    cell: ({ row }) => {
      const value = row.getValue("memo") as string;
      const returnValue = value ? (
        <Check className="text-blue-500" size={20} />
      ) : null;
      return <div className="flex justify-center">{returnValue}</div>;
    },
  },
];
