import {User} from "@/modules/auth";
import {Links} from "@/modules/questions";
import {Meta} from "@/modules/users/model/userApi.types";

export type SnippetsResponse = {
    data:{
        data: CodeFragment[]
        links:Links
        meta:Meta

    }
};

export type CodeFragment = {
    id: string;
    code: string;
    language: string;
    marks: Mark[];
    user: Author;
    comments: Comment[];
};

export type Mark = {
    id: string;
    type: 'like' | 'dislike';
    user: Author;
};

export type Author = {
    id: string;
    username: string;
    role: 'user' | 'admin';
};

export type Comment = {
    id: string
    content: string
    user:User
};
export type SnippetQueryParams = {
    userId?: number
    page?: number
    limit?: number
    sortBy?: string[] //['id:DESC', 'language:ASC']
    search?: string
    searchBy?: string[] // ["code", "language"]
}
export type CreateSnippetResponse={
    id:number
    language:string
    code:string
    user:User
}