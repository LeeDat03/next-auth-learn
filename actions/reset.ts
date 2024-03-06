"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (value: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(value);

  if (!validateFields.success) {
    return { error: "Invalid email address." };
  }

  const { email } = validateFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "Email not found." };

  const passswordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passswordResetToken.email,
    passswordResetToken.token
  );
  return { success: "Email sent!" };
};
