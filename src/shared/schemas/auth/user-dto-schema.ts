import {z} from 'zod';

export const UserDtoSchema = z.object({
    id: z.string(),
    username: z.string().min(3),
    role: z.string()
})
