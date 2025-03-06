import { z } from "zod";

export const UserTypeSchema = z.object({
  name: z.string(),
  email: z.string().email().min(8).max(999),
  password: z.string().min(6).max(999)
})