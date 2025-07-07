import {Mark, Comment} from "@/modules/posts/model/post-type";
import './PostCard.css'
import {useNavigate} from "react-router-dom";

type PropsType = {
    id: string
    author: string
    marks: Mark[]
    language: string
    code: string
    comments: Comment[]
}

export const PostCard = ({id, code, author, language, marks, comments}: PropsType) => {
    const navigate = useNavigate()
    const commentsCount = comments.length
    const likesCount = marks.filter(m => m.type === 'like').length
    const dislikesCount =marks.filter(m=>m.type==='dislike').length
    const handleNavigate = () => {
        navigate(`/post/${id}`)
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
                <button>👍 {likesCount}</button>
                <button>👎 {dislikesCount}</button>
                <button onClick={handleNavigate}>💬{commentsCount}</button>
            </div>
        </div>
    );
};
