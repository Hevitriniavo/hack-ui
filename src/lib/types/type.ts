import { z } from "zod";
import { CredentialSchema, UserSchema } from "../schema/schema";

export type FormErrors = {
    email ?: string;
    password ?: string;
};

export type FieldErrors = {
    [K in keyof FormErrors]: FormErrors[K];
} & {
    username ?: string;
};


export type CredentialType = z.infer<typeof CredentialSchema>
export type User = z.infer<typeof UserSchema>;

export interface JwtToken {
    type: string;
    token: string;
}

  