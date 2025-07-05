import {baseApi} from "@/shared/api/base-api";
import type {UserCredentials, User} from "./auth-types.ts";


export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<{data:User, message:string}, UserCredentials>({
            query: (body) => ({
                url: '/api/auth/login',
                method: 'POST',
                body,
            }),
        }),
        register: build.mutation<User, UserCredentials>({
            query: (body) => ({
                url: '/api/register',
                method: 'POST',
                body,
            }),
        }),
        me: build.query<{data:User}, void>({
    query:()=>({
        url:'/api/auth',
        method:'GET'
    })
})
    }),
});
export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
