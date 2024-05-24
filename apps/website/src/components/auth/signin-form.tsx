"use client";

import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

import type { FormFieldsSchema } from "@thread/validators/signin";
import { isBoolean, isUndefined } from "@thread/shared/assertion";
import { cn } from "@thread/ui";
import { Button } from "@thread/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@thread/ui/form";
import { Input } from "@thread/ui/input";
import { schema } from "@thread/validators/signin";

import type { PreviousState } from "~/actions/signup";
import { serverAction } from "~/actions/signin";
import { Icons } from "~/components/icons";
import { InputPassword } from "~/components/shared/input-password";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useFormState<PreviousState, FormFieldsSchema>(
    serverAction,
    undefined,
  );

  const form = useForm<FormFieldsSchema>({
    progressive: true,
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
    errors: isUndefined(state) || isBoolean(state) ? undefined : state,
    reValidateMode: "onBlur",
  });

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form
          id="signin-form"
          onSubmit={form.handleSubmit((input) => {
            startTransition(() => {
              formAction(input);
            });
          })}
        >
          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="아이디"
                      autoCapitalize="none"
                      autoComplete="username"
                      autoCorrect="off"
                      dir="ltr"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="비밀번호"
                      autoComplete="current-password"
                      dir="ltr"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              aria-disabled={isPending}
            >
              {isPending ? (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              ) : null}
              <span>로그인</span>
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className={cn("bg-background px-2 text-muted-foreground")}>
            또는
          </span>
        </div>
      </div>
    </div>
  );
}
