import React from 'react';
import {useGetSnippetByIdQuery} from "@/modules/posts/model/posts-api";
import {useParams} from "react-router-dom";

export const PostPage = () => {
    const {id} = useParams()
    const {data:post, isLoading} = useGetSnippetByIdQuery(Number(id))
    console.log(post)
    if (isLoading) return <p>Loading...</p>
    if (!post) return <p>Not found...</p>

    return (
        <div>
            {post?.comments.map(el => el.content)}
        </div>
    );
};

