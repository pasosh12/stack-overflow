import React from 'react';
import {usePublicSnippetQuery} from "@/modules/posts/model/posts-api";
import {PostCard} from "@/modules/posts/ui/PostCard";


export const HomePage = () => {
    const {data: result, isLoading} = usePublicSnippetQuery({})

    if (isLoading) return <p>Loading...</p>
    return (
        <div>
            {result?.data?.data.map((post) => {
                return (
                    <PostCard
                        id={post.id}
                        author={post.user.username} code={post.code}
                        language={post.language}
                        marks={post.marks}
                        comments={post.comments}
                    />
                )
            })
            }
        </div>
    );
};
