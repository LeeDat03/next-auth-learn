"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedField.data;
  const hashedPasword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already been use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPasword,
    },
  });

  // TODO: Send verification token email

  return { success: "User created!" };
};
