import {baseApi} from "@/shared/api/base-api";
import {
    CreateQuestionRequest, CreateQuestionResponse,
    GetQuestionsRequestWithParams,
    GetQuestionsResponse, UpdateQuestionRequest, UpdateQuestionResponse
} from "@/modules/questions/model/questions-api.types";


export const questionsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getQuestions: build.query<GetQuestionsResponse, GetQuestionsRequestWithParams>({
            query: (params) => ({
                url: '/api/questions',
                method: 'GET',
                params,
            }),
            providesTags: ["QuestionsList"],
        }),

        createQuestion: build.mutation<CreateQuestionResponse, CreateQuestionRequest>({
            query: (body) => ({
                url: '/api/questions',
                method: 'POST',
                body
            }),
            invalidatesTags:['QuestionsList'],
        }),
        editQuestion: build.mutation<UpdateQuestionResponse, {body:UpdateQuestionRequest, id:string}>({
            query: ({body, id}) => ({
                url: `/api/questions/${id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags:['QuestionsList']
        }),


    }),
});
export const {useGetQuestionsQuery, useCreateQuestionMutation, useEditQuestionMutation} = questionsApi;
