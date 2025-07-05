import {z} from 'zod';
const passwordSchema = z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one symbol" });

export const CredentialsDto = z.object({
    username:z.string().min(5, {message:"Password must be at least 5 characters long"}),
    password:passwordSchema
})

export type LoginInputs = z.infer<typeof CredentialsDto>