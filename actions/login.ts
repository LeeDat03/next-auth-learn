"use server";

import * as z from "zod";
import { LoginSchemas } from "@/schemas";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchemas>) => {
  const validatedField = LoginSchemas.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedField.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
