import { writeFile } from "fs/promises";
import { randomUUID } from "crypto";

export const uploadReceipt = async (c: any) => {
  const body = await c.req.parseBody();

  const file = body.receipt;

  if (!(file instanceof File)) {
    return c.json(
      { message: "File required" },
      400
    );
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    return c.json(
      {
        message:
          "Only JPEG, PNG and WebP allowed",
      },
      400
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return c.json(
      {
        message:
          "Maximum size is 5MB",
      },
      400
    );
  }

  const extension =
    file.name.split(".").pop();

  const filename =
    `${randomUUID()}.${extension}`;

  const buffer = Buffer.from(
    await file.arrayBuffer()
  );

  await writeFile(
    `uploads/${filename}`,
    buffer
  );

  return c.json({
    receiptUrl: `/uploads/${filename}`,
  });
};
