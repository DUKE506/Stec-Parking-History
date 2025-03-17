"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useHistoryStore } from "@/stores/histories-store";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect } from "react";
import { History } from "@prisma/client";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  // data: TData[];
}

const CustomDataTable = <TData, TValue>({
  columns,
}: // data,
DataTableProps<TData, TValue>) => {
  //입출차 목록 store
  const { histories, setCurrentHistory, fetchHistories } = useHistoryStore();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: histories as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    //Sorting --
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    //Sorting --
  });

  useEffect(() => {
    fetchHistories();
  }, [fetchHistories]);

  return (
    <div className="container max-w-full flex-3 ">
      <Card className="p-8 h-full">
        <CardHeader className="p-0">
          <CardTitle className="text-lg">
            입출차 조회 (데이터수 : {histories.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table className="w-full">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => setCurrentHistory(row.original as History)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex-1 text-sm text-muted-foreground">
            row(s) selected.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomDataTable;
