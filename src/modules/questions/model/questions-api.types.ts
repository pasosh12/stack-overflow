import {SnippetQueryParams} from "@/modules/posts/model/post-types";
import {Meta} from "@/modules/users/model/userApi.types";
import {User} from "@/modules/auth";

export type GetQuestionsRequestWithParams = Omit<SnippetQueryParams, 'userId'>
export type AnswerType = {
    id: string
    content: string
    isCorrect: boolean
}
export type QuestionType = {
    id: number
    title: string
    description: string
    attachedCode: string
    user: User
    answers: AnswerType[]
    isResolved: boolean
}
export type GetQuestionsResponse = {
    data: QuestionType[]
    meta: Meta
}