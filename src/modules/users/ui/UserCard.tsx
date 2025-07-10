import React from 'react';
import {User} from "@/modules/auth";
import s from './UserCard.module.css'

type PropsType = {
    user: User
    onClick: () => void
}
export const UserCard = ({user, ...props}: PropsType) => {
    const {username, role, id} = {...user}
    return (
        <button className={s.userCard_wrapper} onClick={props.onClick}>
            <h2 className={s.h2}>{username}</h2>
            <span>id: {id}</span>
            <span>role: {role}</span>
        </button>
    );
};

