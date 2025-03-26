import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PatrolState, PatrolStateUnionType } from "@/types/patrol/patrol";
import { Patrol } from "@/types/patrol/patrol";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, Check } from "lucide-react";

export const columns: ColumnDef<Patrol>[] = [
  {
    accessorKey: "patrolDtm",
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
      const cellData = row.original.patrolDtm;
      if (!cellData) {
        return <div className="text-center"></div>;
      }

      const formatValue = dayjs(cellData).format("YYYY-MM-DD HH:mm:ss");

      return <div className="text-center ">{formatValue}</div>;
    },
  },
  {
    accessorKey: "patrolName",
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
      const cellData = row.original.patrolName;
      let textColor = "text-black";
      let backgroundColor = "bg-muted-foreground";
      switch (cellData as PatrolStateUnionType) {
        case PatrolState.BLACK:
          backgroundColor = "bg-destructive";
          textColor = "text-white";
          return (
            <div className="text-center">
              <Badge className={`${backgroundColor} w-25 ${textColor}`}>
                {cellData}
              </Badge>
            </div>
          );

        case PatrolState.VISIT:
          backgroundColor = "bg-blue-500";
          backgroundColor = "bg-white";
          break;
        case PatrolState.NORMAL:
          backgroundColor = "bg-green-500";
          backgroundColor = "bg-white";
          break;
        case PatrolState.RESERVE:
          backgroundColor = "bg-muted-foreground";
          backgroundColor = "bg-white";
          break;
      }
      return <div className="text-center text-xs">{cellData}</div>;
    },
  },
  {
    accessorKey: "carNum",
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
      const cellData = row.original.carNum;
      return <div className="text-center">{cellData}</div>;
    },
  },
  {
    accessorKey: "patrolUserNm",
    header: () => <div className="text-center">담당자</div>,
    cell: ({ row }) => {
      const cellData = row.original.patrolUserNm;
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
    accessorKey: "patrolRemark",
    header: () => <div className="text-center">비고</div>,
    cell: ({ row }) => {
      const cellData = row.original.patrolRemark;
      const returnValue = cellData ? (
        <Check className="text-blue-500" size={20} />
      ) : null;
      return <div className="flex justify-center">{returnValue}</div>;
    },
  },
];
