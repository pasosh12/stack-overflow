import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: '/',
    credentials: 'include',
});

export const customBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if ('meta' in result) {
        const status = result.meta?.response?.status;
        if (status && status >= 200 && status < 300) {

            console.log(`✅ Successful response: ${status}`);
        } else {
            console.warn(`⛔️ Response returned with status ${status}`);
        }
    }

    return result;
};
