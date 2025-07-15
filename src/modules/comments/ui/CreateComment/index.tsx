import React, {ChangeEvent, useState} from "react";
import s from './CreateCommentForm.module.css'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {useSendCommentMutation} from "@/modules/comments/model/comments-api";
import {Button} from "@/shared/ui/Button";
import {useClickAway} from "@uidotdev/usehooks";
import {useParams} from "react-router-dom";
import {TextField} from "@mui/material";


export const CreateCommentForm = () => {
    const [text, setText] = useState('')
    const [isFormExpanded, setIsFormExpanded] = useState(false)
    const [sendComment] = useSendCommentMutation()
    const {id: snippetId} = useParams()
    const newCommentRef = useClickAway<HTMLDivElement>(() => {
        setIsFormExpanded(false)
    })
    const onSubmit = () => {
        sendComment({content: text, snippetId: Number(snippetId)})
        setText('')
    };
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    return (
        <div className={s.commentForm_wrapper} ref={newCommentRef}>

            {isFormExpanded ? (
                <form className={s.commentForm}>
                    <div className={s.commentForm_content}>
                         <TextField multiline value={text}
                             label={'Leave your comment here'}
                                   onChange={e=>onChangeHandler(e)}
                                   className={s.commentForm_field}
                        />
                        <Button variant={'contained'} type={'submit'} onClick={onSubmit}>
                            <SendRoundedIcon/>
                        </Button>
                    </div>
                </form>
            ) : (
                <Button variant={'outlined'} size={'small'} onClick={() => setIsFormExpanded(!isFormExpanded)}>
                    New comment
                </Button>)
            }
        </div>
    );
};
