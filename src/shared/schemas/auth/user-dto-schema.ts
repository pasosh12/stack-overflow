import {z} from 'zod';
import {UserRoles} from "@/shared/enums/user-roles";

export const UserDtoSchema = z.object({
    id:z.string(),
    username:z.string().min(3),
    role:z.nativeEnum(UserRoles),
})