import React, {InputHTMLAttributes,
    // TextareaHTMLAttributes
    useId} from 'react';
import clsx from 'clsx';
import s from './TextField.module.css';

type TextFieldType = {
        variant?: 'outlined' | 'filled' | 'standard';
        error?: boolean;
        label?: string;
        errorMessage?: string;
        className?: string;
        value?: string
// } & TextareaHTMLAttributes<HTMLTextAreaElement>;
    } & Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'>;

export function TextField({
                              variant = 'outlined',
                              label = 'Label',
                              className,
                              value,
                              errorMessage,
                              ...props
                          }: TextFieldType) {
    const inputClassName = clsx(s.textfield_input, {
        [s.textfield__standard]: variant === 'standard',
        [s.textfield__filled]: variant === 'filled',
        [s.textfield__outlined]: variant === 'outlined',
        [s.error]: !!errorMessage,
    }, className);
    const generatedId = useId();
    const inputId = props.id ?? generatedId;
    return (
        <div className={s.textfield_wrapper}>
            <div className={s.input_wrapper}>
                <input
                    id={inputId}
                    className={inputClassName}
                    placeholder=" "
                    value={value}
                    {...props}
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
