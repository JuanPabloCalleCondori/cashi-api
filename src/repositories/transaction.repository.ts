import prisma from "../lib/prisma.js";

export const transactionRepository = {
  findAll: (userId: number) =>
    prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
      },
    }),

  findById: (id: number) =>
    prisma.transaction.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    }),

  create: (data: any) =>
    prisma.transaction.create({
      data: {
        amount: data.amount,
        type: data.type,
        description: data.description,
        date: new Date(data.date),

        receiptUrl: data.receiptUrl,
        latitude: data.latitude,
        longitude: data.longitude,

        categoryId: data.categoryId,
        userId: data.userId,
      },
    }),

  update: (id: number, data: any) =>
    prisma.transaction.update({
      where: { id },
      data: {
        ...data,
        date: data.date
          ? new Date(data.date)
          : undefined,
      },
    }),

  delete: (id: number) =>
    prisma.transaction.delete({
      where: { id },
    }),
};
