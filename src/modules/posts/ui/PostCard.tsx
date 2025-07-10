import {Mark, Comment} from "@/modules/posts/model/post-types";
import './PostCard.css'
import {useNavigate} from "react-router-dom";
import {ProtectedAction} from "@/shared/utils/protected-action";
import {SNIPPET_PAGE_LINK} from "@/shared/constants";
import {useMarkSnippetByIdMutation} from "@/modules/posts";
import {useState} from "react";
import {CircularProgress} from "@mui/material";

type PropsType = {
    id: string
    author: string
    marks: Mark[]
    language: string
    code: string
    comments: Comment[]
}

export const PostCard = ({id, code, author, language, marks, comments}: PropsType) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const navigate = useNavigate()
    const commentsCount = comments.length
    const likesCount = marks.filter(m => m.type === 'like').length
    const dislikesCount = marks.filter(m => m.type === 'dislike').length
    const [markPost] = useMarkSnippetByIdMutation()

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
        <div className="post-card">
            <div className="post-meta">
                <span>{language}</span>
                <span>@{author}</span>
            </div>

            <pre className="code-block">
        <code>{code}</code>
      </pre>

            <div className="post-actions">
                <ProtectedAction>
                    <button onClick={() => handleMark('like')}
                            disabled={isButtonDisabled}>
                        👍 {likesCount}
                    </button>
                </ProtectedAction>
                <ProtectedAction>
                    <button
                        // className={clsx(isButtonDisabled?)}
                        onClick={() => handleMark('dislike')}
                        disabled={isButtonDisabled}>
                        👎 {dislikesCount}
                    </button>
                </ProtectedAction>
                <span style={{display:'flex', alignItems:'center'}}>
                    {isButtonDisabled ? <CircularProgress size={15} color="primary"/> : null}
                </span>
                <button onClick={handleNavigate}>💬{commentsCount}</button>
            </div>
        </div>
    );
};
