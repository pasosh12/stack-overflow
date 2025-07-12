import {baseApi} from "@/shared/api/base-api";
import {GetQuestionsRequestWithParams, GetQuestionsResponse} from "@/modules/questions/model/questions-api.types";


export const questionsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getQuestions: build.query<{data: GetQuestionsResponse}, GetQuestionsRequestWithParams>({
            query: (params) => ({
                url: '/api/questions',
                method: 'GET',
                params,
            }),
        }),

        // editQuestion: build.mutation<void, void>({
        //     query: () => ({
        //         url: '/api/auth',
        //         method: 'Post'
        //     }),
        // }),


    }),
});
export const {useGetQuestionsQuery} = questionsApi;
