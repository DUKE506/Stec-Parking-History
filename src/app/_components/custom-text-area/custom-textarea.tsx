import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "../custom-toaster/hooks";
import { CardDescription } from "@/components/ui/card";

const FormSchema = z.object({
  bio: z.string().min(1, {
    message: "한 글자 이상 입력해주세요",
  }),
  // .max(160, {
  //   message: "Bio must not be longer than 30 characters.",
  // }),
});

const CustomTextAreaForm = ({
  label,
  placeholder,
  value,
  setValue,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  setValue: (context: string) => void;
}) => {
  //edit
  const [isEdit, setIsEdit] = useState<boolean>(false);
  //토스터
  const { addToast } = useToast();
  //폼
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      bio: value,
    },
  });

  useEffect(() => {}, []);

  //submit 함수
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await setValue(data.bio);
    addToast({
      message: "저장",
    });
    setIsEdit(!isEdit);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="justify-between">
                <CardDescription>{label}</CardDescription>

                {isEdit ? (
                  <Button
                    type="button"
                    onClick={() => {
                      form.reset();
                      setIsEdit(!isEdit);
                    }}
                  >
                    취소
                  </Button>
                ) : (
                  <Button type="button" onClick={() => setIsEdit(!isEdit)}>
                    수정
                  </Button>
                )}
              </FormLabel>
              {isEdit ? (
                <>
                  <FormControl>
                    <Textarea
                      placeholder={placeholder}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </>
              ) : (
                <DisabledTextArea context={value} />
              )}
            </FormItem>
          )}
        />
        {isEdit ? (
          <Button className="text-xs  w-full" type="submit">
            저장
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default CustomTextAreaForm;

export const DisabledTextArea = ({ context }: { context?: string }) => {
  return <div className="text-xs">{context ? context : "해당사항 없음"}</div>;
};
