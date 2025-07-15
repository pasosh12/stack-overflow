import './MySnippets.module.css'
import {EditableSnippetCard, usePublicSnippetQuery} from "@/modules/posts";
import {Comments} from "@/modules/comments/ui";
import React from "react";
import {selectUser} from "@/app/app-slice";
import {useAppSelector} from "@/shared/hooks/use-app-selector";

export const MySnippets = () => {
    const me = useAppSelector(selectUser)
    const myId = me?.id
    const {data: posts, isLoading} = usePublicSnippetQuery({userId: Number(myId), sortBy: ['id:DESC'] })
    if (isLoading) return <p>Loading...</p>
    if (!posts) return <p>Not found...</p>
    const snippets = posts?.data.data

    return (
        <>
            <h2>My Snippets</h2>
            {snippets.map((snippet) => {
                return (
                    <React.Fragment key={snippet.id}>
                        <EditableSnippetCard
                            id={snippet.id}
                            author={snippet.user.username} marks={snippet.marks}
                            language={snippet.language}
                            code={snippet.code} comments={snippet.comments}/>

                        <Comments snippet={snippet}/>
                    </React.Fragment>
                )
            })}
        </>
    );
};
