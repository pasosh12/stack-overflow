import {baseApi} from "@/shared/api/base-api";
import type {User, UserCredentials, UserResponse} from "./auth-types.ts";


export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<{ data: User , message: string }, UserCredentials>({
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
        me: build.query<UserResponse, void>({
            query: () => ({
                url: '/api/auth',
                method: 'GET'
            }),
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST'
            }),
        }),
    }),
});
export const {useLoginMutation, useRegisterMutation, useMeQuery, useLogoutMutation} = authApi;
