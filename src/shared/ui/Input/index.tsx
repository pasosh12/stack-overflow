import {InputHTMLAttributes} from "react";
import s from "./Input.module.css";
import clsx from "clsx";

type PropsType = {
    isError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({className, isError, ...props}:PropsType) => {
    const inputClassName = clsx(className, s.input, {
        [s.input_error]: isError,
    });

    return <input className={inputClassName} {...props} />;
};
