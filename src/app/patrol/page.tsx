"use client";
import React from "react";
import Navigation from "../_components/nav/nav";
import Filter from "./_components/filter/filter";
import List from "./_components/list/list";
import { usePatrolQuerySync } from "@/hooks/patrol_hooks";

const Page = () => {
  usePatrolQuerySync();
  return (
    <div className="h-dvh">
      <div className="flex flex-col w-full gap-10  h-full">
        <Navigation />
        <div className="flex px-10 gap-10">
          <Filter />
          <List />
        </div>
      </div>
    </div>
  );
};

export default Page;
