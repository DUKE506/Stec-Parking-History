"use client";
import { Card } from "@/components/ui/card";
import Logo from "../../../../public/parkit-logo.svg";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApiStore } from "@/stores/api-store";
import { Button } from "@/components/ui/button";
import CustomInput from "../custom-input/custom-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../custom-toaster/hooks";

const formSchema = z.object({
  aptName: z.string().min(2, {
    message: "2글자 이상 입력해주세요.",
  }),
});

const Navigation = () => {
  const pathName = usePathname();
  const { aptName, getAptName, setAptName } = useApiStore();
  const [newName, setNewName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //토스터
  const { addToast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aptName: newName,
    },
  });

  useEffect(() => {
    if (!aptName) {
      getAptName();
    }
  }, []);

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const res = await setAptName(value.aptName);

    if (res === 200) {
      addToast({
        message: "저장",
      });
      setIsOpen(false);
      return;
    }
    addToast({ message: "실패", type: "error" });

    setIsOpen(false);
  };

  const handleNewWindow = () => {
    window.open(
      "http://naver.com",
      "_black",
      "width=800,height=600,left=200,top=200"
    );
  };

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
        <div className="flex gap-4 items-center ">
          <Button
            className="text-xs hover:cursor-pointer"
            onClick={handleNewWindow}
          >
            실시간 등록
          </Button>
          <Dialog
            open={isOpen}
            onOpenChange={(open) => {
              if (!open) {
                // 다이얼로그가 닫힐 때 form reset
                form.reset();
              }
              setIsOpen(open);
            }}
          >
            <DialogTrigger asChild>
              <div className="flex items-center gap-2">
                {/* <Building /> */}
                <span className="font-[pretendard] text-xl font-bold">
                  {aptName}
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="text-lg font-semibold leading-none tracking-tight">
                <DialogTitle>명칭 변경</DialogTitle>
              </DialogHeader>
              <div className="font-[pretendard] text-xl font-bold">
                {aptName}
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="aptName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CustomInput
                            placeholder="변경할 명칭을 입력하세요."
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit">변경</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
};

export default Navigation;
