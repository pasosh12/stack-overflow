import React from 'react';
import {usePublicSnippetQuery} from "@/modules/posts/model/posts-api";
import {PostCard} from "@/modules/posts/ui/PostCard";
import {selectIsAuthenticated} from "@/app/app-slice";
import {useAppSelector} from "@/shared/hooks/use-app-selector";

export const HomePage = () => {
    const {data: result, isLoading} = usePublicSnippetQuery({})
    // console.log(result?.data)
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    console.log(isAuthenticated)
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
