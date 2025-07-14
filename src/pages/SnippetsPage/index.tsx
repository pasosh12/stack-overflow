import React from 'react';
import {useGetSnippetByIdQuery} from "@/modules/posts/model/posts-api";
import {useParams} from "react-router-dom";
import {EditableSnippetCard} from "@/modules/posts";
import {Comments} from "@/modules/comments/ui";

export const SnippetPage = () => {
    const {id} = useParams<string>()
    const {data: post, isLoading} = useGetSnippetByIdQuery(Number(id))
    if (isLoading) return <p>Loading...</p>
    if (!post) return <p>Not found...</p>
    const snippet = post.data

    return (
        <>
            <EditableSnippetCard id={snippet.id}
                                 author={snippet.user.username} marks={snippet.marks}
                                 language={snippet.language}
                                 code={snippet.code} comments={snippet.comments}/>

            <Comments snippet={snippet}/>
        </>

    )
}

