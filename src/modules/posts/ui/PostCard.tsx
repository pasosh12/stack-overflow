import {Mark, Comment} from "@/shared/schemas/post/post-type";
import  './PostCard.css'
type PropsType={
    author:string
    marks:Mark[]
    language: string
    code:string
    comments:Comment[]
}

export const PostCard = (  {code,author,language,marks, comments}:PropsType) => {

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
                <span>👍 {marks.map(mark=>mark.type==='like')}</span>
                <span>👎 {marks.map(mark=>mark.type==='dislike')}</span>
                <span  >💬 {comments?.map(el=>el.content)}</span>
            </div>
        </div>
    );
};
