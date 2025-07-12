import React from 'react';
import s from './QuestionCard.module.css'
import defaultAvatar from '@/shared/assets/defaultAvatar.jpg'
import {AnswerType} from "@/modules/questions/model/questions-api.types";
import {AnswersExpandable} from "@/modules/questions/ui/Answers";

type PropsType = {
    title: string
    description: string
    author: string
    answers: AnswerType[]
}
export const QuestionCard = ({title, description, author, answers}: PropsType) => {
    const [isAnswersOpen, toggleIsAnswersOpen] = React.useState(false)
    return (
        <div className={s.questionCard_wrapper}>
            <div className={s.questionCard_content}>
                <img
                    className={s.questionCard_icon}
                    src={defaultAvatar}
                    alt="question-mark"
                />
                <div className={s.questionCard_title}>
                    <h3>{title}</h3>
                    <span>asked by: {author}</span>
                </div>
            </div>

            <p>{description}</p>

            <AnswersExpandable answers={answers}
                               isAnswersOpen={isAnswersOpen}
                               toggleIsAnswersOpen={toggleIsAnswersOpen}/>
        </div>
    )
        ;
};

