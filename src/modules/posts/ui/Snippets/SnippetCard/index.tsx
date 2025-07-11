import {Comment, Mark} from "@/modules/posts/model/post-types";
import s from './PostCard.module.css'
import {useNavigate} from "react-router-dom";
import {ProtectedAction} from "@/shared/utils/protected-action";
import {SNIPPET_PAGE_LINK} from "@/shared/constants";
import {useMarkSnippetByIdMutation} from "@/modules/posts";
import {useState} from "react";
import {CircularProgress} from "@mui/material";
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {selectUser} from "@/app/app-slice";
import {EditSnippet} from "modules/posts/ui/Snippets/EditSnippet";
import {useClickAway} from "@uidotdev/usehooks"

type PropsType = {
    id: string
    author: string
    marks: Mark[]
    language: string
    code: string
    comments: Comment[]
}

export const SnippetCard = ({id , code, author, language, marks, comments}: PropsType) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const navigate = useNavigate()
    const commentsCount = comments.length
    const likesCount = marks.filter(m => m.type === 'like').length
    const dislikesCount = marks.filter(m => m.type === 'dislike').length
    const [markPost] = useMarkSnippetByIdMutation()

    const [isEditing, setIsEditing] = useState(false)
    const isAuthor = useAppSelector(selectUser)?.username === author
    const editorRef = useClickAway<HTMLDivElement>(() => {
        setIsEditing(false)
    })

    const handleNavigate = () => {
        navigate(`/${SNIPPET_PAGE_LINK}/${id}`)
    }
    const handleMark = async (type: 'like' | 'dislike') => {
        setIsButtonDisabled(true)
        await markPost({id: Number(id), type, params: {}})
        setTimeout(() => {
            setIsButtonDisabled(false)
        }, 500)
    }
    return (
        <div className={s.post_card}>
            <div className={s.post_meta}>
                <span>{language}</span>
                <span>@{author}</span>
            </div>
            <div ref={editorRef}>

                {isAuthor && isEditing ?
                    <EditSnippet lang={language} code={code} id={Number(id)}/>
                    :
                    <pre className={s.code_block}
                         onDoubleClick={() => setIsEditing(true)}>
                        {code}
                    </pre>
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
    );
};
