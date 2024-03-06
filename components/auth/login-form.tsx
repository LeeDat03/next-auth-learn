"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { login } from "@/actions/login";
import { LoginSchemas } from "@/schemas";
import Link from "next/link";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already used"
      : "";

  const form = useForm<z.infer<typeof LoginSchemas>>({
    resolver: zodResolver(LoginSchemas),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchemas>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Wrong in login-form!"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcomeback"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john@example.com"
                          type="email"
                          disabled={isPending}
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
