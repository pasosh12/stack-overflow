import {baseApi} from "@/shared/api/base-api";
import {CodeFragment, SnippetQueryParams, SnippetsResponse} from "@/modules/posts/model/post-types";


export const postsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        publicSnippet: build.query<{ data: SnippetsResponse }, SnippetQueryParams>({
            query: (params) => ({
                url: '/api/snippets',
                method: 'GET',
                params,
            }),
            providesTags: [{type: "PublicSnippetList"}],
        }),
        getSnippetById: build.query<{ data: CodeFragment }, number>({
            query: (id) => ({
                url: `/api/snippets/${id}`,
                method: 'GET',
            }),

        }),
        markSnippetById: build.mutation<void, { id: number, type: 'like' | 'dislike', params: SnippetQueryParams }>({
            query: ({id, type}) => ({
                url: `/api/snippets/${id}/mark`,
                method: 'POST',
                body: {mark: type}
            }),
            invalidatesTags: [{type: "PublicSnippetList"}],
            onQueryStarted: async ({id, type, params}, {dispatch, queryFulfilled}) => {

                const patch = dispatch(
                    postsApi.util.updateQueryData('publicSnippet', params, (draft) => {
                        console.log('optimistic')
                        const snippet = draft.data.data.find((s) => Number(s.id) === id);
                        if (snippet) {
                            snippet.marks.push({
                                type,
                                id: "",
                                user: {
                                    id: "",
                                    username: "",
                                    role: "user"
                                }
                            });
                        }
                    })
                );


                try {
                    await queryFulfilled;
                } catch {
                    patch.undo();
                }
            },


        })


    }),
});
export const {usePublicSnippetQuery, useGetSnippetByIdQuery, useMarkSnippetByIdMutation} = postsApi;

