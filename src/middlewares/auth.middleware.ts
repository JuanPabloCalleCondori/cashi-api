import { Context, Next } from "hono";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = async (
  c: Context,
  next: Next
) => {
  const authHeader =
    c.req.header("Authorization");

  if (!authHeader) {
    return c.json(
      { message: "Unauthorized" },
      401
    );
  }

  const token = authHeader.replace(
    "Bearer ",
    ""
  );

  try {
    const payload = jwt.verify(
      token,
      JWT_SECRET
    ) as {
      userId: number;
    };

    c.set("userId", payload.userId);

    await next();
  } catch {
    return c.json(
      { message: "Invalid token" },
      401
    );
  }
};
