import React from 'react';
import {usePublicSnippetQuery} from "@/modules/posts/model/posts-api";
import {SnippetCard} from "modules/posts/ui/Snippets/SnippetCard";
import {CircularProgress} from "@mui/material";


export const HomePage = () => {
    const {data: result, isLoading} = usePublicSnippetQuery({})

    if (isLoading) return <CircularProgress/>

    return (
        <div>
            {result?.data?.data.map((post) => {
                return (
                    <SnippetCard key={post.id}
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
