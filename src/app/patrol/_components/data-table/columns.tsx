import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PatrolStateUnionType } from "@/types/patrol/patrol";
import { Patrol, PatrolState } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, Check } from "lucide-react";

export const columns: ColumnDef<Patrol>[] = [
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            순찰시간
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const cellData = row.original.time;
      if (!cellData) {
        return <div className="text-center"></div>;
      }

      const formatValue = dayjs(cellData).format("YYYY-MM-DD HH:mm:ss");

      return <div className="text-center">{formatValue}</div>;
    },
  },
  {
    accessorKey: "codeName",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            상태
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const cellData = row.original.codeName;
      let backgroundColor = "bg-muted-foreground";
      switch (cellData as PatrolState) {
        case PatrolState.블랙리스트:
          backgroundColor = "bg-destructive";
          break;
        case PatrolState.방문객:
          backgroundColor = "bg-blue-500";
          break;
        case PatrolState.입주민:
          backgroundColor = "bg-green-500";
          break;
        case PatrolState.순찰:
          backgroundColor = "bg-black";
          break;
      }
      return (
        <div className="text-center">
          <Badge className={`${backgroundColor} w-20`}>{cellData}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "carNumber",
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
      const cellData = row.original.carNumber;
      return <div className="text-center">{cellData}</div>;
    },
  },
  {
    accessorKey: "userName",
    header: () => <div className="text-center">담당자</div>,
    cell: ({ row }) => {
      const cellData = row.original.userName;
      return <div className="text-center">{cellData}</div>;
    },
  },
  // {
  //   accessorKey: "img",
  //   header: () => <div className="text-center">이미지</div>,
  //   cell: ({ row }) => {
  //     const cellData = row.original.img;
  //     return <div className="text-center">{cellData}</div>;
  //   },
  // },
  {
    accessorKey: "note",
    header: () => <div className="text-center">비고</div>,
    cell: ({ row }) => {
      const cellData = row.original.note;
      const returnValue = cellData ? (
        <Check className="text-blue-500" size={20} />
      ) : null;
      return <div className="flex justify-center">{returnValue}</div>;
    },
  },
];
