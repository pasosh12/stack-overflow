import {baseApi} from "@/shared/api/base-api";
import {ApiResponse} from "@/shared/schemas/post/post-type";


export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        publicSnippet: build.query<ApiResponse, void>({
            query: (body) => ({
                url: '/api/snippets',
                method: 'GET',
                body,
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
export const {usePublicSnippetQuery} = authApi;

