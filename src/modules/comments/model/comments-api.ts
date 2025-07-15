import {baseApi} from "@/shared/api/base-api";
import {SendCommentRequest, SendCommentResponse} from "@/modules/comments/model/comments-types";


export const commentsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({



        sendComment: build.mutation< SendCommentResponse,SendCommentRequest >({
            query: (body) => ({
                url: `/api/comments`,
                method: 'POST',
                body
            }),
            invalidatesTags: [{type: "PublicSnippetList"}],
            // onQueryStarted: async ({id, type, params}, {dispatch, queryFulfilled}) => {
            //
            //     const patch = dispatch(
            //         postsApi.util.updateQueryData('publicSnippet', params, (draft) => {
            //             console.log('optimistic')
            //             const snippet = draft.data.data.find((s) => Number(s.id) === id);
            //             if (snippet) {
            //                 snippet.marks.push({
            //                     type,
            //                     id: "",
            //                     user: {
            //                         id: "",
            //                         username: "",
            //                         role: "user"
            //                     }
            //                 });
            //             }
            //         })
            //     );
            //
            //
            //     try {
            //         await queryFulfilled;
            //     } catch {
            //         patch.undo();
            //     }
            // },


        })


    }),
});
export const {useSendCommentMutation} = commentsApi;

