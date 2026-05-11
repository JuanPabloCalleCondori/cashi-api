import { Context } from "hono";
import { transactionRepository } from "../repositories/transaction.repository.js";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../schemas/transaction.schema.js";

export const getTransactions = async (c: Context) => {
  const data = await transactionRepository.findAll();
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

  return c.json(data);
};

export const createTransaction = async (c: Context) => {
  const body = await c.req.json();
  const data = createTransactionSchema.parse(body);

  const result = await transactionRepository.create(data);

  return c.json(result, 201);
};

export const updateTransaction = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const data = updateTransactionSchema.parse(body);

  const result = await transactionRepository.update(id, data);

  return c.json(result);
};

export const deleteTransaction = async (c: Context) => {
  const id = Number(c.req.param("id"));

  await transactionRepository.delete(id);

  return c.json({ message: "Deleted" });
};

export const getBalance = async (c: any) => {
  try {
    const transactions = await transactionRepository.findAll();

    console.log(transactions); 

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
  } catch (error) {
    console.log("BALANCE ERROR:", error);
    return c.json({ error: "Internal error", detail: String(error) }, 500);
  }
};