import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Cashi API funcionando" });
});

serve({
  fetch: app.fetch,
  port: 3000,
});

console.log("Servidor corriendo en http://localhost:3000");

import categoryRoutes from "./routes/category.routes";

app.route("/categories", categoryRoutes);

import transactionRoutes from "./routes/transaction.routes.js";

app.route("/transactions", transactionRoutes);