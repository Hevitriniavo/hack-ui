import { z } from "zod";


export const CredentialSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2),
  });

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  username: z.string().min(5),
});
