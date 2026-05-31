import prisma from "../lib/prisma.js";

export const userRepository = {
  findByEmail: (email: string) =>
    prisma.user.findUnique({
      where: {
        email,
      },
    }),

  create: (data: {
    email: string;
    passwordHash: string;
  }) =>
    prisma.user.create({
      data,
    }),
};
