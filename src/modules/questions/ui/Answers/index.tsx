import React, {Dispatch, SetStateAction} from 'react';
import s from './Answers.module.css'
import eyeOff from "@/shared/assets/eye-off.svg";
import eye from "@/shared/assets/eye.svg";
import ExpandableText from "@/shared/ui/ExpandableText";
import {AnswerType} from "@/modules/questions/model/questions-api.types";
type PropsType={
    answers:AnswerType[]
    isAnswersOpen:boolean
    toggleIsAnswersOpen:Dispatch<SetStateAction<boolean>>
}

export const AnswersExpandable = ({answers, isAnswersOpen, toggleIsAnswersOpen}: PropsType)  => {
    return (
        <>
            {(answers.length !== 0) && (
                <div className={s.answer_title} >
                    <h3> {isAnswersOpen ?'Hide answers': 'Show answers'}</h3>
                    <img className={s.showAnswers} src={isAnswersOpen ? eyeOff : eye} alt={'show answers'}
                         onClick={() => toggleIsAnswersOpen(!isAnswersOpen)}/>
                    {isAnswersOpen && (

                        <ul className={s.answers_list}>
                            {answers.map((answer) => (
                                <li key={answer.id} className={s.answer_container}>
                                    {answer.isCorrect && <span>&#x2714;</span>}
                                    <ExpandableText
                                        text={answer.content}
                                        className={s.answer_content}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )
            }
        </>
    );
};

