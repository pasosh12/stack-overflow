import React from 'react';
import {Editor} from "@monaco-editor/react";
import {Button} from "@/shared/ui/Button";
import {useCreateSnippetMutation, useEditSnippetMutation, useGetLanguagesQuery,} from "@/modules/posts";
import s from './CodeEditor.module.css'
import {CircularProgress} from "@mui/material";

type PropsType = {
    id?: number
    successAction?: () => void
    isEdit?: boolean
    lang?: string
    code?: string
}
export const CodeEditor = ({
                               lang, code,
                               isEdit = false, id, ...props
                           }: PropsType) => {

    const [language, setLanguage] = React.useState<string>(lang || '')
    const [localCode, setLocalCode] = React.useState<string>(code || '')
    const {data: languages} = useGetLanguagesQuery()
    const [createSnippet] = useCreateSnippetMutation()
    const [editSnippet, {isLoading}] = useEditSnippetMutation()


    const handleSubmit = () => {
        const trimmedCode = localCode.trim()
        setLocalCode(trimmedCode)
        if (!trimmedCode) {
            return alert('enter code')
        }
        if (!language) {
            return alert('Choose language')
        }
        if (localCode && language) {
            if (isEdit) {
                editSnippet({body: {code: trimmedCode, language}, id: id!}).unwrap()
                    .then(() => {
                        if (props.successAction) props.successAction()
                    })
                    .catch(e => alert(e))
            } else {
                createSnippet({code: trimmedCode, language}).unwrap()
                setLocalCode('')
                setLanguage('')
                if (props.successAction) props.successAction()

            }

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
                theme="vs"
                value={localCode}
                onChange={(newCode) => setLocalCode(newCode || "")}
                options={{
                    minimap: {enabled: false},
                    fontSize: 14,
                }}
            />

            <Button onClick={handleSubmit}>
                {isEdit ? "Edit snippet " : "Post snippet"}
            </Button>
        </div>
    );
};

