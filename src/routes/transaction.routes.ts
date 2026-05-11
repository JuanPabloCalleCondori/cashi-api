import { Hono } from "hono";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getBalance,
} from "../controllers/transaction.controller.js";

const transactionRoutes = new Hono();

transactionRoutes.get("/", getTransactions);

transactionRoutes.get("/balance", getBalance);

transactionRoutes.get("/:id", getTransactionById);

transactionRoutes.post("/", createTransaction);
transactionRoutes.patch("/:id", updateTransaction);
transactionRoutes.delete("/:id", deleteTransaction);



export default transactionRoutes;
