"use client";
import { Card } from "@/components/ui/card";
import Logo from "../../../../public/parkit-logo.svg";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathName = usePathname();

  useEffect(() => {
    console.log(pathName);
  }, []);
  return (
    <div className="container max-w-full px-10 mt-5">
      <Card className="flex-row justify-between px-3 py-3 ">
        <div className="flex gap-8">
          <Link className="flex items-center gap-2" href={"/"}>
            <Logo width={40} />
            <span className="text-xl font-extrabold ">Park it</span>
          </Link>

          <div className="flex items-center">
            <Link href={"/patrol"}>
              <span
                className={`text-sm text-muted-foreground hover:text-black ${
                  pathName.includes("/patrol")
                    ? "!text-black font-extrabold"
                    : null
                } `}
              >
                순찰이력
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-semibold">일동미라주</span>
        </div>
      </Card>
    </div>
  );
};

export default Navigation;
