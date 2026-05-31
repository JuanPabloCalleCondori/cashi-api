import { Context } from "hono";
import { transactionRepository } from "../repositories/transaction.repository.js";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../schemas/transaction.schema.js";

export const getTransactions = async (c: any) => {
  const userId = c.get("userId");

  const data = await transactionRepository.findAll(userId);

  return c.json(data);
};

export const getTransactionById = async (c: any) => {
  const idParam = c.req.param("id");

  const id = Number(idParam);

  if (!idParam || isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }

  const data = await transactionRepository.findById(id);

  if (!data) {
    return c.json({ message: "Not found" }, 404);
  }

  // Ownership check
  if (data.userId !== c.get("userId")) {
  return c.json({ message: "Forbidden" }, 403);
  }

  return c.json(data);
};

export const createTransaction = async (c: any) => {
  const userId = c.get("userId");

  const body = await c.req.json();

  const data = createTransactionSchema.parse(body);

  const result = await transactionRepository.create({
    ...data,
    userId,
  });

  return c.json(result, 201);
};

export const updateTransaction = async (c: any) => {
  const userId = c.get("userId");

  const id = Number(c.req.param("id"));

  const body = await c.req.json();

  const data = updateTransactionSchema.parse(body);

  const transaction =
    await transactionRepository.findById(id);

  if (!transaction) {
    return c.json(
      { message: "Not found" },
      404
    );
  }

  if (transaction.userId !== userId) {
    return c.json(
      { message: "Forbidden" },
      403
    );
  }

  const result =
    await transactionRepository.update(
      id,
      data
    );

  return c.json(result);
};

export const deleteTransaction = async (c: any) => {
  const userId = c.get("userId");

  const id = Number(c.req.param("id"));

  const transaction =
    await transactionRepository.findById(id);

  if (!transaction) {
    return c.json(
      { message: "Not found" },
      404
    );
  }

  if (transaction.userId !== userId) {
    return c.json(
      { message: "Forbidden" },
      403
    );
  }

  await transactionRepository.delete(id);

  return c.json({
    message: "Deleted",
  });
};

export const getBalance = async (c: any) => {
  const userId = c.get("userId");

  const transactions =
    await transactionRepository.findAll(userId);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  return c.json({
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  });
};
