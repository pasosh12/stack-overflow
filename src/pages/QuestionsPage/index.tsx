import React, {useState} from 'react';
import {useGetQuestionsQuery} from "@/modules/questions/model/question-api";
import {CircularProgress, Pagination} from "@mui/material";
import {EditableQuestionCard} from "@/modules/questions/ui/QuestionCard";
import {usePagination} from "@/shared/hooks/use-pagination";

export const QuestionsPage = () => {
    const [page, setPage] = useState(1)
    const {data, isLoading} = useGetQuestionsQuery({page, sortBy: ['id:DESC']},
        {pollingInterval: 10000})
    const {currentPage} = usePagination(data?.data.links)
    const lastPage = data?.data.meta.totalPages
    const questions = data?.data.data || []

    if (isLoading) return <CircularProgress/>
    if (questions?.length === 0) return <h3>No question yet</h3>
    return (
        <>
            <h2>Questions Page</h2>
            <Pagination
                count={lastPage}
                siblingCount={1}
                page={currentPage}
                color="primary"
                onChange={(event: React.ChangeEvent<unknown>, newPage) => {
                    setPage(newPage)
                }}
            />
            {questions?.map(question => (
                <EditableQuestionCard key={question.id}
                                      questionId={question.id}
                                      title={question.title}
                                      answers={question.answers}
                                      description={question.description}
                                      author={question.user.username}
                                      attachedCode={question.attachedCode}
                />
            ))}

        </>
    );
};