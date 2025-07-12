import React from 'react';
import {CodeEditor} from "@/modules/posts/ui/CodeEditor";
import s from './CreateSnippet.module.css'
export const CreateSnippet  = () => {
    return (
        <form className={s.postSnippet_wrapper}>
            <h2>Create new snippet!</h2>
            <CodeEditor />
        </form>
    );
};

