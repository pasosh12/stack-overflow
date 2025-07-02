import {z} from 'zod';
import {UserRoles} from "../../enums/user-roles.ts";
export const UserDtoSchema = z.object({
    id:z.string(),
    username:z.string().min(3),
    role:z.nativeEnum(UserRoles),
})