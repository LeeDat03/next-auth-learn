"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { SettingSchemas } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const setting = async (values: z.infer<typeof SettingSchemas>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "User not found!" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== dbUser.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(
      values.email as string
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: "Incorect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  return { success: "Setting updated!" };
};
