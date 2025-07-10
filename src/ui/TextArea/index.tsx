import React, {InputHTMLAttributes, useId} from 'react';
import clsx from 'clsx';
import s from './TextField.module.css';

type TextFieldType = {
    variant?: 'outlined' | 'filled' | 'standard';
    error?: boolean;
    label?: string;
    errorMessage?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'>;

export function TextField({
                              variant = 'outlined',
                              label = 'Label',
                              className,
                              // error = false,
                              errorMessage,
                              ...props
                          }: TextFieldType) {
    const inputClassName = clsx(className, s.textfield_input, {
        [s.textfield__standard]: variant === 'standard',
        [s.textfield__filled]: variant === 'filled',
        [s.textfield__outlined]: variant === 'outlined',
        [s.error]: !!errorMessage,
    });
    const generatedId = useId();
    const inputId = props.id ?? generatedId;
    return (
        <div className={s.textfield_wrapper}>
            <div className={s.input_wrapper}>
                <input
                    className={inputClassName}
                    placeholder=" "
                    {...props}
                    id={inputId}
                    required={props.required}
                />
                {errorMessage ?
                    <label className={s.textfield_label} htmlFor={inputId}>
                        {errorMessage}
                    </label> :
                    <label className={s.textfield_label} htmlFor={inputId}>
                        {label}
                    </label>
                }
            </div>
        </div>
    );
}
