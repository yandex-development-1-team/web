import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.string(),
  name: z.string().optional(),
  last_name: z.string().optional(),
  status: z.string().optional()
})

export const LoginResponseSchema = z.object({
  token: z.string(),
  refresh_token: z.string(),
  user: UserSchema
})

export const LoginRequestSchema = z.object({
  login: z.string(),
  password: z.string()
})

export type User = z.infer<typeof UserSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>
export type LoginRequest = z.infer<typeof LoginRequestSchema>
