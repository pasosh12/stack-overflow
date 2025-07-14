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
    id: string
    title: string
    description: string
    attachedCode: string
    user: User
    answers: AnswerType[]
    isResolved: boolean
}
export type Links = {
    first: string
    previous: string
    current: string
    next: string
    last: string
}
export type GetQuestionsResponse = {
    data: {
        data: QuestionType[]
        meta: Meta
        links: Links
    }
}
export type CreateQuestionRequest = {
    title: string
    description: string
    attachedCode: string
}
export type CreateQuestionResponse = {
    data: {
        user: User
        id: string
    } & CreateQuestionRequest

}
export type UpdateQuestionResponse = CreateQuestionResponse
export type UpdateQuestionRequest = CreateQuestionRequest