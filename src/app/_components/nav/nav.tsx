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
import { Settings } from "lucide-react";

const formSchema = z.object({
  aptName: z.string().min(2, {
    message: "2글자 이상 입력해주세요.",
  }),
});

const ipSchema = z.object({
  IpAddress: z.string().refine(
    (value) => {
      // IP 부분과 포트 부분 분리
      const [ipPart, portPart] = value.split(":");

      // IP 주소 검증 (IPv4 또는 IPv6)
      const ipSchema = z.string().ip();
      const ipResult = ipSchema.safeParse(ipPart);

      // 포트 번호 검증 (1-65535 범위의 숫자)
      const isValidPort =
        portPart !== undefined &&
        /^\d+$/.test(portPart) &&
        parseInt(portPart) >= 1 &&
        parseInt(portPart) <= 65535;

      return ipResult.success && isValidPort;
    },
    {
      message:
        "유효한 IP 주소와 포트 번호 형식이 아닙니다 (예: 192.168.1.1:8080)",
    }
  ),
});

const Navigation = () => {
  const pathName = usePathname();
  const { aptName, getAptName, setAptName, theHamBizIp } = useApiStore();

  //토스터
  const { addToast } = useToast();

  useEffect(() => {
    if (!aptName) {
      getAptName();
    }
  }, []);

  const handleNewWindow = () => {
    if (theHamBizIp) {
      window.open(
        `http://${theHamBizIp}/`,
        "_black",
        "width=800,height=600,left=200,top=200"
      );
      return;
    }
    addToast({ message: "IP를 등록해주세요.", type: "error" });
  };

  return (
    <div className="container max-w-full px-10 mt-5">
      <Card className="flex-row justify-between px-3 py-3 ">
        <div className="flex gap-8">
          <Link className="flex items-center gap-2" href={"/"}>
            <Logo width={40} />
            <span className="text-xl font-extrabold ">Park it</span>
          </Link>

          <div className="flex items-center gap-6">
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
            <span
              className={`text-sm text-muted-foreground hover:text-black hover:cursor-pointer`}
              onClick={handleNewWindow}
            >
              실시간 등록
            </span>
            <Setting />
          </div>
        </div>
        <div className="flex gap-4 items-center ">
          <div className="flex items-center gap-2">
            {/* <Building /> */}
            <span className="font-[pretendard] text-xl font-bold">
              {aptName}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

const Setting = () => {
  const [newIp, setNewIp] = useState<string>("");
  const [newName, setNewName] = useState<string>("");

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [editIp, setEditIp] = useState<boolean>(false);
  const [editName, setEditName] = useState<boolean>(false);

  //토스터
  const { addToast } = useToast();

  const {
    aptName,
    setAptName,
    getAptName,
    theHamBizIp,
    setTheHamBizIp,
    getTheHamBizIp,
  } = useApiStore();

  useEffect(() => {
    getTheHamBizIp();
  }, []);

  const nameForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aptName: newName,
    },
  });

  const ipForm = useForm<z.infer<typeof ipSchema>>({
    resolver: zodResolver(ipSchema),
    defaultValues: {
      IpAddress: newIp,
    },
  });

  const onNameSubmit = async (value: z.infer<typeof formSchema>) => {
    const res = await setAptName(value.aptName);

    if (res === 200) {
      setEditName(false);
      addToast({
        message: "저장",
      });

      return;
    }
    setEditName(false);
    addToast({ message: "실패", type: "error" });
  };

  const onIpSubmit = async (value: z.infer<typeof ipSchema>) => {
    const res = await setTheHamBizIp(value.IpAddress);

    if (res === 200) {
      setEditIp(false);
      addToast({
        message: "저장",
      });

      return;
    }
    setEditIp(false);
    addToast({ message: "실패", type: "error" });
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          // 다이얼로그가 닫힐 때 form reset
          ipForm.reset();
          nameForm.reset();
          setEditIp(false);
          setEditName(false);
        }
        setDialogOpen(open);
      }}
    >
      <DialogTrigger>
        <Settings
          size={24}
          strokeWidth="1"
          className="text-muted-foreground hover:cursor-pointer  hover:text-black"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-lg font-semibold leading-none tracking-tight">
          <DialogTitle>설정</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex flex-col gap-6">
            <Form {...ipForm}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ipForm.handleSubmit(onIpSubmit)(e);
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col  gap-2">
                    <span className="text-xs">IP</span>
                    <span className="text-sm">{theHamBizIp ?? "없음"}</span>
                  </div>
                  {editIp ? (
                    <Button
                      type="button"
                      onClick={ipForm.handleSubmit(onIpSubmit)}
                    >
                      저장
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="hover:cursor-pointer"
                      onClick={() => setEditIp(!editIp)}
                    >
                      변경
                    </Button>
                  )}
                </div>
                {editIp ? (
                  <FormField
                    control={ipForm.control}
                    name="IpAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CustomInput
                            placeholder="XXX.XXX.XXX.XXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}
              </form>
            </Form>
            <Form {...nameForm}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  nameForm.handleSubmit(onNameSubmit)(e);
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs">주택명칭</span>
                    <span className="text-sm">{aptName ?? "에스텍시스템"}</span>
                  </div>
                  {editName ? (
                    <Button
                      type="button"
                      onClick={nameForm.handleSubmit(onNameSubmit)}
                    >
                      저장
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="hover:cursor-pointer"
                      onClick={() => setEditName(!editName)}
                    >
                      변경
                    </Button>
                  )}
                </div>
                {editName ? (
                  <FormField
                    control={nameForm.control}
                    name="aptName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CustomInput placeholder="주택명칭" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}
              </form>
            </Form>
          </div>
          <div className="flex flex-col"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Navigation;
