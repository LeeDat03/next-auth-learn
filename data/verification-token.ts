import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verifcationToken = await db.verifcationToken.findFirst({
      where: { email },
    });

    return verifcationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verifcationToken = await db.verifcationToken.findUnique({
      where: { token },
    });

    return verifcationToken;
  } catch {
    return null;
  }
};
