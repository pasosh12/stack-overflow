import React from 'react';
import {CodeEditor} from "@/modules/posts/ui/CodeEditor";
import s from './CreateSnippet.module.css'
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";
import {setAppSuccessAC} from "@/app/app-slice";

export const CreateSnippetForm = () => {
    const dispatch = useAppDispatch()
    const successAction = () => {
        dispatch(setAppSuccessAC({successMessage: 'Snippet successfully created'}))
    }
    return (
        <form className={s.postSnippet_wrapper}>
            <h2>Create new snippet!</h2>
            <CodeEditor successAction={successAction}/>
        </form>
    );
};

