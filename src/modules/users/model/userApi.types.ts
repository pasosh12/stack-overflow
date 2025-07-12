import {SnippetQueryParams} from "@/modules/posts/model/post-types";
import {User} from "@/modules/auth";

export type UsersQueryParams = Omit<SnippetQueryParams, "userId">
type SortOrder = "ASC" | "DESC"
export type Meta = {
    itemsPerPage: number
    totalItems: number
    currentPage: number
    totalPages: number
    sortBy: [string, SortOrder][]
    searchBy: string[]
    search: string
    select: string[]
    filter: Record<string, unknown>
}
type Links = {
    first: string;
    previous: string;
    current: string;
    next: string;
    last: string;
}


type Statistic = {
    snippetsCount: number
    rating: number
    commentsCount: number
    likesCount: number
    dislikesCount: number
    questionsCount: number
    correctAnswersCount: number
    regularAnswersCount: number
}

export type GetUsersResponseWithMeta = {
    data: User[]
    meta: Meta
    links: Links[]
}
export type GetUserByIdResponse = User
export type GetUserStatisticsResponse = User & {
    statistic: Statistic
}