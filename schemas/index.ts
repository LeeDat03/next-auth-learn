import * as z from "zod";

export const LoginSchemas = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Minimun 6 characters required.",
  }),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
});
