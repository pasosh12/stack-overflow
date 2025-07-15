import React, { ComponentProps } from 'react';
import clsx from 'clsx';
import s from './Button.module.css';

type PropsType = {
    variant?: 'contained' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
} & ComponentProps<'button'>;

const variantStyles = {
    contained: s['btn--contained'],
    outlined: s['btn--outlined'],
    text: s['btn--text'],
};
const variantSize = {
    small: s['btn--small'],
    medium: s['btn--medium'],
    large: s['btn--large'],
};

export function Button(props: PropsType) {
    const {
        variant = 'contained',
        size = 'medium',
        className,
        ...restProps
    } = props;

    return (
        <button
            type="button"
            className={clsx(
                s.btn,
                variantStyles[variant],
                variantSize[size],
                className,
            )}
            {...restProps}
        />
    );
}
