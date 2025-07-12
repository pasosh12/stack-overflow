import React from 'react';
import {useGetQuestionsQuery} from "@/modules/questions/model/question-api";
import {CircularProgress} from "@mui/material";
import {QuestionCard} from "@/modules/questions/ui/QuestionCard";
import {useLocation} from "react-router-dom";
import {Path} from "@/shared/routing";
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {selectUser} from "@/app/app-slice";
import {QuestionType} from "@/modules/questions/model/questions-api.types";

export const QuestionsPage = () => {
    const {data, isLoading} = useGetQuestionsQuery({sortBy:['id:DESC']})
    const location = useLocation()
    let questions:QuestionType[] = []
    const myId = useAppSelector(selectUser)?.id
    if (location.pathname === Path.MyQuestions) {
        questions = data?.data.data.filter(question => question.user.id === myId) || []
    } else {
        questions = data?.data.data || []
    }
    if (isLoading) return <CircularProgress/>
    if (questions?.length === 0) return <h3>No question yet</h3>
    return (
        <>
            <h2>Questions Page</h2>
            {questions?.map(question => (
                <QuestionCard key={question.id} title={question.title} answers={question.answers}
                              description={question.description} author={question.user.username}/>
            ))}

        </>
    );
};