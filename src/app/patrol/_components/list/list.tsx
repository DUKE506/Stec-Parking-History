"use client";
import CustomDataTable from "@/app/_components/custom-data-table/custom-data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { columns } from "../data-table/columns";

const List = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>순찰 이력</CardTitle>
      </CardHeader>

      <CardContent className="">
        <div className="rounded-md border h-full overflow-y-auto">
          <CustomDataTable columns={columns} />
        </div>
      </CardContent>
    </Card>
  );
};

export default List;
