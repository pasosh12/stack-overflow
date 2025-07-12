import React from 'react';
import {CodeFragment} from "@/modules/posts/model/post-types";
import s from './Comments.module.css'
import {CreateCommentForm} from "@/modules/comments/ui/CreateComment";

type PropsType = {
    snippet: CodeFragment
}

export const Comments = ({snippet}: PropsType) => {

    return (
        <div className={s.comments_container}>
            <CreateCommentForm/>
            {snippet.comments.length === 0 ? (
                <p className={s.empty_comments}>No comments yet</p>
            ) : (
                <ul className={s.comments_list}>
                    {snippet.comments?.map((comment) => (
                        <li key={comment.id} className={s.comment_item}>
                            <div className={s.comment_header}>
                                <span className={s.comment_author}>
                                    {comment.user?.username}
                                </span>
                            </div>
                            <p className={s.comment_content}>{comment.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

