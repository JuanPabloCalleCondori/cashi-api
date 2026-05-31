import { Context } from "hono";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/user.repository.js";
import {
  registerSchema,
  loginSchema,
} from "../schemas/auth.schema.js";

const JWT_SECRET = "super-secret-key";

export const register = async (c: Context) => {
  const body = await c.req.json();

  const data = registerSchema.parse(body);

  const existingUser = await userRepository.findByEmail(
    data.email
  );

  if (existingUser) {
    return c.json(
      { message: "Email already exists" },
      400
    );
  }

  const passwordHash = await bcrypt.hash(
    data.password,
    10
  );

  const user = await userRepository.create({
    email: data.email,
    passwordHash,
  });

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  return c.json({
    token,
  });
};

export const login = async (c: Context) => {
  const body = await c.req.json();

  const data = loginSchema.parse(body);

  const user = await userRepository.findByEmail(
    data.email
  );

  if (!user) {
    return c.json(
      { message: "Invalid credentials" },
      401
    );
  }

  const validPassword = await bcrypt.compare(
    data.password,
    user.passwordHash
  );

  if (!validPassword) {
    return c.json(
      { message: "Invalid credentials" },
      401
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  return c.json({
    token,
  });
};
