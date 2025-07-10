import {baseApi} from "@/shared/api/base-api";
import {User} from "@/modules/auth";


export const profileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        deleteAccount: build.mutation<User, void>({
            query: (body) => ({
                url: '/api/me',
                method: 'DELETE',
                body,
            }),
        }),
        getProfileInfo: build.query<{ data: User }, void>({
            query: () => ({
                url: '/api/me',
                method: 'GET'
            }),
        }),
        changeProfileName: build.mutation<void, { username: string }>({
            query: (body) => ({
                url: '/api/me',
                method: 'PATCH',
                body
            })
        }),
        changePassword:build.mutation<{updatedCount:number},{oldPassword:string,newPassword:string}>({
            query: (body) => ({
                url: '/api/me/password',
                method: 'PATCH',
                body
            })
        })

    })

});
export const {useDeleteAccountMutation, useGetProfileInfoQuery, useChangePasswordMutation,useChangeProfileNameMutation} = profileApi
