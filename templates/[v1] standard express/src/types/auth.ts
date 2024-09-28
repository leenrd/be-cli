import { z } from "zod";

export const auth_schema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type auth_dto = z.infer<typeof auth_schema>;
