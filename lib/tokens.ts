import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 1000 * 3600);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verifcationToken.delete({ where: { id: existingToken.id } });
  }

  const verificationToken = await db.verifcationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
