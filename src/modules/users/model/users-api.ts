import {baseApi} from "@/shared/api/base-api";
import {
    GetUserByIdResponse,
    GetUsersResponseWithMeta,
    GetUserStatisticsResponse,
    UsersQueryParams
} from "@/modules/users/model/userApi.types";
import {UserResponse} from "@/modules/auth";


export const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
              getUsers: build.query<{data:GetUsersResponseWithMeta}, UsersQueryParams>({
            query: () => ({
                url: '/api/users',
                method: 'GET'
            }),
        }),
        getUserById: build.query<GetUserByIdResponse, number>({
            query: (id) => ({
                url: `/api/users/${id}`,
                method: 'GET'
            }),
        }),
        getUserStatistics: build.query<GetUserStatisticsResponse, number>({
            query: (id) => ({
                url: `/api/users/${id}/statistics`,
                method: 'GET'
            }),
        }),
    }),
});
export const {useGetUsersQuery,useGetUserByIdQuery,useGetUserStatisticsQuery} = usersApi;
