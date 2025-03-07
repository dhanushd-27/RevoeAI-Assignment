import { z } from "zod";

export const UserSignUpSchema = z.object({
  name: z.string(),
  email: z.string().email().min(8).max(999),
  password: z.string().min(6).max(999)
})

export const UserSignInSchema = z.object({
  email: z.string().email().min(8).max(999),
  password: z.string().min(6).max(999)
});

export const SheetSchema = z.object({
  link: z.string().min(20).max(999),
  sheetName: z.string().min(1).max(999)
})