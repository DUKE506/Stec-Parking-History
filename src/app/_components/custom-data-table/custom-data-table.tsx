"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

interface DataTableProps<TData, TValue> {
  //컬럼 구조
  columns: ColumnDef<TData, TValue>[];
  //데이터
  data: TData[];
  //현재 클릭한 데이터 상태관리 함수
  onClickRow: (value: TData) => void;
  //보여질 row개수
  viewSize: number;
}

const CustomDataTable = <TData, TValue>({
  columns,
  data,
  onClickRow,
  viewSize,
}: DataTableProps<TData, TValue>) => {
  //클릭한 데이터
  const [selected, setSelected] = useState<TData>();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: Array.isArray(data) ? data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: viewSize,
      },
    },
  });

  //row 클릭 핸들러러
  const onRowHandle = (data: TData) => {
    setSelected(data);
    onClickRow(data);
  };

  return (
    <Table className="w-full h-full ">
      <TableHeader className="position-sticky top-0 ">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} className="bg-accent">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={`${row.original === selected ? "bg-accent" : null}`}
              data-state={row.getIsSelected() && "selected"}
              onClick={() => onRowHandle(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center text-xs">
              데이터 없음
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomDataTable;
