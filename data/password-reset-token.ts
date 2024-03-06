import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passswordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passswordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passswordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passswordResetToken;
  } catch {
    return null;
  }
};
