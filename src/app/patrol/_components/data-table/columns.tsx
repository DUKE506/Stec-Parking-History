import { Patrol } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Patrol>[] = [
  {
    accessorKey: "time",
    header: () => <div className="text-center">순찰시간</div>,
    cell: ({ row }) => {
      const cellData = row.original.time;
      return <div className="text-center">{cellData}</div>;
    },
  },
  {
    accessorKey: "codeName",
    header: () => <div className="text-center">상태</div>,
    cell: ({ row }) => {
      const cellData = row.original.codeName;
      return <div className="text-center">{cellData}</div>;
    },
  },
  {
    accessorKey: "carNumber",
    header: () => <div className="text-center">차량번호</div>,
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
  {
    accessorKey: "img",
    header: () => <div className="text-center">이미지</div>,
    cell: ({ row }) => {
      const cellData = row.original.img;
      return <div className="text-center">{cellData}</div>;
    },
  },
  {
    accessorKey: "note",
    header: () => <div className="text-center">비고</div>,
    cell: ({ row }) => {
      const cellData = row.original.note;
      return <div className="text-center">{cellData}</div>;
    },
  },
];
