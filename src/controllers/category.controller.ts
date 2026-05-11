
import { Context } from "hono";
import { categoryRepository } from "../repositories/category.repository";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";

export const getCategories = async (c: Context) => {
  const data = await categoryRepository.findAll();
  return c.json(data);
};

export const getCategoryById = async (c: Context) => {
  const id = Number(c.req.param("id"));

  const data = await categoryRepository.findById(id);

  if (!data) {
    return c.json({ message: "Not found" }, 404);
  }

  return c.json(data);
};

export const createCategory = async (c: Context) => {
  const body = await c.req.json();
  const data = createCategorySchema.parse(body);

  const result = await categoryRepository.create(data.name);

  return c.json(result, 201);
};

export const updateCategory = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const data = updateCategorySchema.parse(body);

  const result = await categoryRepository.update(id, data.name || "");

  return c.json(result);
};

export const deleteCategory = async (c: Context) => {
  const id = Number(c.req.param("id"));

  await categoryRepository.delete(id);

  return c.json({ message: "Deleted" });
};