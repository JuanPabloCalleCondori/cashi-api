import { Hono } from "hono";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const categoryRoutes = new Hono();
categoryRoutes.use("*", authMiddleware);

categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.post("/", createCategory);
categoryRoutes.patch("/:id", updateCategory);
categoryRoutes.delete("/:id", deleteCategory);

export default categoryRoutes;
