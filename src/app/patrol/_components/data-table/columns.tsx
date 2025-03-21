import { Patrol } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Patrol>[] = [
  {
    accessorKey: "time",
    header: () => <div className="text-center">순찰시간</div>,
    cell: ({ row }) => {
      const cellData = row.original.time;
    },
  },
  {
    accessorKey: "codeName",
    header: () => <div className="text-center">상태</div>,
  },
  {
    accessorKey: "carNumber",
    header: () => <div className="text-center">차량번호</div>,
  },
  {
    accessorKey: "userName",
    header: () => <div className="text-center">담당자</div>,
  },
  {
    accessorKey: "img",
    header: () => <div className="text-center">이미지</div>,
  },
  {
    accessorKey: "note",
    header: () => <div className="text-center">비고</div>,
  },
];
