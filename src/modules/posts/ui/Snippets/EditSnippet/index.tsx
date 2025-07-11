import React, {useState} from "react";
import s from "./EditSnippet.module.css";
import {CodeEditor} from "@/modules/posts/ui/CodeEditor";
import { useGetSnippetByIdQuery} from "@/modules/posts";

export const EditSnippet = ({lang, code, id}: { lang: string, code: string, id: number }) => {
    const [isEdited, setIsEdited] = useState(false);
    const {data:updatedSnippet, refetch} = useGetSnippetByIdQuery(id!, {skip: !isEdited})
    const handleEditSucess = () => {
        setIsEdited(true)
        refetch()
    }
    return (
        <div
            className={s.editSnippet_wrapper}
        >
            {!isEdited && <h2>Edit your snippet:</h2>}
            {isEdited  ? (
                <div>
                    <h3>Updated snippet:</h3>
                    <pre>{updatedSnippet?.data.code || code}</pre>
                    <p>Language: {updatedSnippet?.data.language || lang}</p>
                    <button onClick={() => setIsEdited(false)}>Edit again</button>
                </div>
            ) : (
                <CodeEditor
                    id={id}
                    action={handleEditSucess}
                    isEdit={true}
                    lang={lang}
                    code={code}
                />
            )}
        </div>
    );
};
