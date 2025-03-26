"use client";
import { usePatrolQuerySync } from "@/hooks/patrol/patrol_hooks";
import React from "react";
import Navigation from "../_components/nav/nav";
import Filter from "./_components/filter/filter";
import List from "./_components/list/list";
import { PatrolDetail } from "./_components/patrol-detail/patrol-detail";
import { ArrowUp } from "lucide-react";

const PatrolClientPage = () => {
  usePatrolQuerySync();

  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="h-full min-h-[100vh]">
      <div className="flex flex-col w-full gap-6  h-full">
        <Navigation />
        <Filter />
        <div className="flex px-10 gap-6 flex-1 min-h-0 pb-10">
          <section className="flex-1">
            <List />
          </section>
          <section>
            <PatrolDetail />
          </section>
        </div>
      </div>
      <ArrowUp
        className="fixed right-5 bottom-5 bg-black text-white rounded-full p-1 : hover:bg-muted-foreground hover:cursor-pointer hover:duration-150"
        size={30}
        onClick={onScrollToTop}
      />
    </div>
  );
};

export default PatrolClientPage;
