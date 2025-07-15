import React, {useState} from "react";
import {Comment, Mark} from "@/modules/posts/model/post-types";
import s from './EditableSnippetCard.module.css'
import {useNavigate} from "react-router-dom";
import {ProtectedAction} from "@/shared/utils/protected-action";
import {SNIPPET_PAGE_LINK} from "@/shared/constants";
import {useMarkSnippetByIdMutation} from "@/modules/posts";
import {CircularProgress} from "@mui/material";
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {selectUser, setAppSuccessAC} from "@/app/app-slice";
import {useClickAway} from "@uidotdev/usehooks"
import {Editor} from "@monaco-editor/react";
import {CodeEditor} from "@/modules/posts/ui/CodeEditor";
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";

type PropsType = {
    id: string
    author: string
    marks: Mark[]
    language: string
    code: string
    comments: Comment[]
}

export const  EditableSnippetCard = ({id, code, author, language, marks, comments}: PropsType) => {
    const dispatch=useAppDispatch()
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const navigate = useNavigate()
    const likesCount = marks.filter(m => m.type === 'like').length
    const dislikesCount = marks.filter(m => m.type === 'dislike').length
    const commentsCount = comments.length
    const [markPost] = useMarkSnippetByIdMutation()

    const [isEditing, setIsEditing] = useState(false)
    const isAuthor = useAppSelector(selectUser)?.username === author
    const editorRef = useClickAway<HTMLDivElement>(() => {
        setIsEditing(false)
    })

    const handleNavigate = () => {
        navigate(`${SNIPPET_PAGE_LINK}/${id}`, {replace: true})
    }

    const handleMark = async (type: 'like' | 'dislike') => {
        setIsButtonDisabled(true)
        await markPost({id: Number(id), type, params: {page: 1, sortBy: ['id:DESC']}})
        setTimeout(() => {
            setIsButtonDisabled(false)
        }, 500)
    }
    const successEditAction=()=>{
        setIsEditing(false)
        dispatch(setAppSuccessAC({successMessage:'Snippet successfully edited'}))
    }
    return (
        <div className={s.post_card}>
            <div className={s.post_meta}>
                <span>{language}</span>
                <span>@{author}</span>
            </div>
            <div ref={editorRef}>

                {isAuthor && isEditing ?
                    <CodeEditor
                        id={Number(id)}
                        successAction={successEditAction}
                        isEdit={true} //not posting new snippet
                        lang={language}
                        code={code}
                    />
                    :
                    <div onDoubleClick={() => setIsEditing(true)}>
                        <Editor
                            height='150px'
                            value={code}
                            language={language}
                            onChange={() => setIsEditing(true)}
                            options={{
                                readOnly: isEditing,
                                minimap: {enabled: false},
                                mouseWheelScrollSensitivity: 0,
                                scrollbar: {
                                    alwaysConsumeMouseWheel: false,
                                    vertical: 'auto',
                                    horizontal: 'auto',
                                },
                            }}
                        />
                    </div>
                }
            </div>
            <div className={s.post_actions}>
                <ProtectedAction>
                    <button
                        className={s.post_mark}
                        onClick={() => handleMark('like')}
                        disabled={isButtonDisabled}>
                        👍 {likesCount}
                    </button>
                </ProtectedAction>
                <ProtectedAction>
                    <button
                        className={s.post_mark}
                        onClick={() => handleMark('dislike')}
                        disabled={isButtonDisabled}>
                        👎 {dislikesCount}
                    </button>
                </ProtectedAction>
                <span style={{display: 'flex', alignItems: 'center'}}>
                    {isButtonDisabled ? <CircularProgress size={15} color="primary"/> : null}
                </span>
                <button
                    className={s.post_mark}
                    onClick={handleNavigate}>💬{commentsCount}</button>
            </div>
        </div>
    )
        ;
};
