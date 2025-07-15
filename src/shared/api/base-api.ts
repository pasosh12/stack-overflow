import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {handleError} from "@/shared/utils/handleError";

export const baseApi = createApi({
    reducerPath: 'api',
    tagTypes: ["Auth", "Snippet", "PublicSnippetList", 'QuestionsList', 'UserInfo'],

    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: '/',
            credentials: 'include',
        })(args, api, extraOptions)
        handleError(api, result)
        return result
    },
    endpoints: () => ({}),
})
