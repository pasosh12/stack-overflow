import React, {useState} from 'react';
import {CircularProgress, Pagination} from "@mui/material";
import {EditableSnippetCard, usePublicSnippetQuery} from "@/modules/posts";
import {usePagination} from "@/shared/hooks";


export const HomePage = () => {
    const [page, setPage] = useState(1)
    const {data: result, isLoading} = usePublicSnippetQuery({page, sortBy: ['id:DESC']})
    const {currentPage} = usePagination(result?.data.links)
    const totalPages = result?.data.meta.totalPages
    if (isLoading) return <CircularProgress/>

    return (
        <div>
            <Pagination count={totalPages} page={currentPage} onChange={(_, page) => setPage(page)}/>
            {result?.data?.data.map((post) => {
                return (
                    <EditableSnippetCard key={post.id}
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
