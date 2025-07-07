import {baseApi} from "@/shared/api/base-api";
import {ApiResponse, CodeFragment} from "@/modules/posts/model/post-type";

export type SnippetQueryParams = {
    userId?: number
    page?: number
    limit?: number
    sortBy?: string[] //['id:DESC', 'language:ASC']
    search?: string
    searchBy?: string[] // ["code", "language"]
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        publicSnippet: build.query<ApiResponse, SnippetQueryParams>({
            query: (params) => ({
                url: '/api/snippets',
                method: 'GET',
                params,
            }),
        }),
        getSnippetById: build.query<CodeFragment, number>({
            query: (id) => ({
                url: `/api/snippets/${id}`,
                method: 'GET',
            }),
        }),

        // register: build.mutation<User, UserCredentials>({
        //     query: (body) => ({
        //         url: '/api/register',
        //         method: 'POST',
        //         body,
        //     }),
        // }),
        // me: build.query<{data:User}, void>({
        //     query:()=>({
        //         url:'/api/auth',
        //         method:'GET'
        //     })
        // })
    }),
});
export const {usePublicSnippetQuery, useGetSnippetByIdQuery} = authApi;

