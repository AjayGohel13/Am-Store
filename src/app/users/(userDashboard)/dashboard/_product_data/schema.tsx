import { z } from "zod"
export const taskSchema = z.object({
  title: z.string(),
  status: z.string(),
  stock: z.number(),
  price: z.number(),
  brand: z.string(),
  isVerified: z.boolean(),
  createdAt: z.date(),
})

export type Task = z.infer<typeof taskSchema>