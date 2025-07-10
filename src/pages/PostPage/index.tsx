import React from 'react';
import {useGetSnippetByIdQuery} from "@/modules/posts/model/posts-api";
import {useParams} from "react-router-dom";
import {PostCard} from "@/modules/posts";

export const PostPage = () => {
    const {id} = useParams()
    const {data: post, isLoading} = useGetSnippetByIdQuery(Number(id))
    console.log(post)
    if (isLoading) return <p>Loading...</p>
    if (!post) return <p>Not found...</p>
    const snippet = post.data

    return (
        <>
            <PostCard id={snippet.id}
                      author={snippet.user.username} marks={snippet.marks}
                      language={snippet.language}
                      code={snippet.code} comments={snippet.comments}/>

            {
                snippet.comments.length === 0 ? (
                    <p>No comments yet</p>
                ) : (
                    <ul>
                        {
                            snippet.comments?.map((comment) => (
                                <li key={comment.id}>{comment.content}</li>
                            ))
                        }
                    </ul>
                )
            }
        </>

    )
}

