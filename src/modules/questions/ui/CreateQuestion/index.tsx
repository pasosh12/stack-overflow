import React, {useState} from "react";

import styles from "./CreateQuestion.module.css";
import {Editor} from "@monaco-editor/react";
import {TextField} from "@mui/material";
import {Button} from "@/shared/ui/Button";
import {useAppDispatch} from "@/shared/hooks";
import {setAppSuccessAC} from "@/app/app-slice";
import {useCreateQuestionMutation} from "@/modules/questions";


export const CreateQuestionForm = () => {


    const [values, setValues] = useState({
        questionTitle: "",
        questionDescription: "",
        code: "",
    });

    const [createQuestion, isSuccess] = useCreateQuestionMutation();
    const dispatch = useAppDispatch()

    const handleSubmit = () => {
        createQuestion({
            title: values.questionTitle,
            description: values.questionDescription,
            attachedCode: values.code,
        })
        if (isSuccess) {
            dispatch(setAppSuccessAC({successMessage: 'Question successfully created'}))
        }
        setValues({questionTitle: '', questionDescription: '', code: ''})
    };

    return (
        <>
            <h2>Create new question</h2>
            <form className={styles.questionForm_wrapper}>

                <TextField
                    label="Question title:"
                    value={values.questionTitle}
                    onChange={(e) =>
                        setValues((prev) => ({...prev, questionTitle: e.target.value}))
                    }
                />
                <TextField
                    label="Question description:"
                    value={values.questionDescription}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            questionDescription: e.target.value,
                        }))
                    }
                />
                <span>Attached code:</span>

                <Editor
                    height="300px"
                    width="600px"
                    theme="vs"
                    value={values.code}
                    options={{
                        minimap: {enabled: false},
                        fontSize: 14,
                    }}
                    onChange={(value: string | undefined) => setValues((prev) => ({...prev, code: value || ''}))}
                />

            </form>
            <Button onClick={handleSubmit}>
                Publish question
            </Button>
        </>
    );
};
