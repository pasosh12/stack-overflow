import React from 'react';
import {Editor} from "@monaco-editor/react";
import {Button} from "@/shared/ui/Button";
import {
    useCreateSnippetMutation,
    useEditSnippetMutation,
    useGetLanguagesQuery,
} from "@/modules/posts";
import s from './CodeEditor.module.css'
import {CircularProgress} from "@mui/material";

type PropsType = {
    id?: number
    action?: () => void
    isEdit?: boolean
    lang?: string
    code?: string
}
export const CodeEditor = ({lang, code, isEdit = false, id, ...props}: PropsType) => {
    const [language, setLanguage] = React.useState<string>(lang || "")
    const [localCode, setLocalCode] = React.useState<string>(code || "")
    const {data: languages, isLoading} = useGetLanguagesQuery()
    const [createSnippet] = useCreateSnippetMutation()
    const [editSnippet] = useEditSnippetMutation()

    const handleSubmit = () => {
        if (localCode && language) {

            if (isEdit) {
                editSnippet({body: {code: localCode, language}, id: id!}).unwrap()
                    .then(() => {
                        alert('updated successfully')
                    })
                    .catch(e => alert(e))
                    .finally(() => {
                        if (props.action) props.action()
                    })
            } else {
                createSnippet({code: localCode, language}).unwrap()
            }


        } else {
            alert('Choose language and fill input')
        }
    }
    const languagesArr = languages?.data.map(el => el)
    if (isLoading) return <CircularProgress/>

    return (
        <div className={s.codeEditor_wrapper}>
            <label htmlFor="select-language"
                   className={s.codeEditor_label}
            >
                Language of your snippet:
            </label>
            <select
                className={s.codeEditor_select}
                id="select-language"
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
            >
                <option value="">--Select language--</option>

                {languagesArr?.map((lang) => {
                        return (
                            <option value={lang}>{lang}</option>
                        )
                    }
                )}
            </select>

            <Editor
                height="400px"
                width="600px"
                language={language}
                theme="vs-dark"
                value={localCode}
                onChange={(newCode) => setLocalCode(newCode || "")}
                options={{
                    minimap: {enabled: false},
                    fontSize: 14,
                }}
            />

            <Button onClick={handleSubmit}>
                Post Snippet
                {/*    {isEdit ? "Edit post " : "Post snippet"}*/}
            </Button>
        </div>
    );
};

