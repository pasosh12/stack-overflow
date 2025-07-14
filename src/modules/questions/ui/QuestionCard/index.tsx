import React, {useState} from 'react';
import s from './QuestionCard.module.css'
import defaultAvatar from '@/shared/assets/defaultAvatar.jpg'
import {AnswerType} from "@/modules/questions/model/questions-api.types";
import {AnswersExpandable} from "@/modules/questions/ui/Answers";
import {useClickAway} from "@uidotdev/usehooks";
import {Editor} from "@monaco-editor/react";
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {selectUser, setAppSuccessAC} from "@/app/app-slice";
import {useEditQuestionMutation} from "@/modules/questions";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import {useAppDispatch} from "@/shared/hooks";

type PropsType = {
    questionId: string
    title: string
    description: string
    author: string
    answers: AnswerType[]
    attachedCode: string
}

export const EditableQuestionCard = ({title, description, author, answers, attachedCode, questionId}: PropsType) => {
    const [isAnswersOpen, toggleIsAnswersOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const isAuthor = useAppSelector(selectUser)?.username === author
    const editorRef = useClickAway<HTMLDivElement>(() => setIsEditing(false))
    const dispatch = useAppDispatch()

    const [values, setValues] = useState({
        questionTitle: title || "",
        questionDescription: description || "",
        code: attachedCode || "",
    });
    const [editQuestion, isSuccess] = useEditQuestionMutation();
    const handleUpdate = () => {
        editQuestion({
            body: {
                title: values.questionTitle,
                description: values.questionDescription,
                attachedCode: values.code,
            },
            id: questionId
        })
        if (isSuccess) {
            setIsEditing(false)
            dispatch(setAppSuccessAC({successMessage: 'Question successfully updated'}))
        }

    }
    return (
        <div ref={editorRef} className={s.questionCard_wrapper}
             onDoubleClick={isAuthor ? () => setIsEditing(true) : undefined}>
            <div className={s.questionCard_content}>
                <img
                    className={s.questionCard_icon}
                    src={defaultAvatar}
                    alt="question-mark"
                />
                <div className={s.questionCard_title}>
                    {isAuthor && isEditing ?
                        <TextField
                            className={s.questionCart_title}
                            value={values.questionTitle}
                            onChange={(e) =>
                                setValues((prev) => ({
                                    ...prev,
                                    questionTitle: e.target.value,
                                }))
                            }
                        />
                        :
                        <h3>{title}</h3>
                    }
                    <span>asked by: {author}</span>
                </div>
            </div>
            {isAuthor && isEditing ?
                <TextField
                    className={s.questionCart_description}
                    // style={{height: '150px'}}
                    value={values.questionDescription}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            questionDescription: e.target.value,
                        }))
                    }
                />
                :
                <p className={s.questionCart_description}>{description}</p>
            }
            <AnswersExpandable answers={answers}
                               isAnswersOpen={isAnswersOpen}
                               toggleIsAnswersOpen={toggleIsAnswersOpen}/>
            {attachedCode &&
                <Editor
                    height='150px'
                    value={attachedCode}
                    language="javascript"
                    theme="vs"
                    onChange={(value: string | undefined) => setValues((prev) => ({...prev, code: value || ""}))}
                    options={{
                        readOnly: !isAuthor,
                        lineNumbers: 'on',
                        minimap: {enabled: false},
                        mouseWheelScrollSensitivity: 0,
                        scrollbar: {
                            alwaysConsumeMouseWheel: false,
                            vertical: 'auto',
                            horizontal: 'auto',
                        },
                    }
                    }/>
            }
            {isEditing &&
                <Button onClick={handleUpdate} variant={'contained'} size={'small'}>
                    Update question
                </Button>}
        </div>
    )
        ;
};

