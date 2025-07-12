import {User} from "@/modules/auth";

export type SendCommentResponse = {
    id: number
    content: string
    user: User
};

export type SendCommentRequest = {
    content: string
    snippetId: number
}