import prisma from "../lib/prisma.js";

export const transactionRepository = {
  findAll: () =>
    prisma.transaction.findMany({
      include: { category: true },
    }),

  findById: (id: number) =>
    prisma.transaction.findUnique({
      where: { id },
      include: { category: true },
    }),

  create: (data: any) =>
    prisma.transaction.create({
      data: {
        amount: data.amount,
        type: data.type,
        description: data.description,
        date: new Date(data.date),
        categoryId: data.categoryId,
      },
    }),

  update: (id: number, data: any) =>
    prisma.transaction.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    }),

  delete: (id: number) =>
    prisma.transaction.delete({
      where: { id },
    }),
};