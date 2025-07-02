import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://codelang.vercel.app',
        credentials: 'include'
    }),
    tagTypes: ['Auth'],
    endpoints: () => ({}),

})