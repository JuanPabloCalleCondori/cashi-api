import { serve } from "@hono/node-server";
import { Hono } from "hono";

import categoryRoutes from "./routes/category.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Cashi API funcionando",
  });
});

app.route("/auth", authRoutes);
app.route("/categories", categoryRoutes);
app.route("/transactions", transactionRoutes);
app.route("/transactions/upload", uploadRoutes);


const port = Number(process.env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`Servidor corriendo en puerto ${port}`);

