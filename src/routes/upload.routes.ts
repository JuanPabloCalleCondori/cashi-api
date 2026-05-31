import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadReceipt } from "../controllers/upload.controller.js";

const uploadRoutes = new Hono();

uploadRoutes.use("*", authMiddleware);

uploadRoutes.post("/", uploadReceipt);

export default uploadRoutes;
