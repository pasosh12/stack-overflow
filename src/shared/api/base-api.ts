import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {customBaseQuery} from "@/shared/api/custom-base-query";

export const baseApi = createApi({
    reducerPath: 'api',
    // baseQuery: customBaseQuery,
    baseQuery:    fetchBaseQuery({
        baseUrl: '/',
        credentials: 'include'
    }),
    tagTypes: ['Auth'],
    endpoints: () => ({}),

})