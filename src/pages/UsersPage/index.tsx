import React from "react";
import {useGetUsersQuery} from "@/modules/users/model/users-api";
import {UserCard} from "@/modules/users/ui/UserCard";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import s from './UsersPage.module.css'

export const UsersPage = () => {
    const navigate = useNavigate()
    const {data: users, isLoading} = useGetUsersQuery({})
    if (isLoading) return <CircularProgress/>
    const handleClick = (id: string) => {
        navigate(`/users/${id}/statistics`)
    }

    return (
        <>
            <h1>Users Page</h1>
            <div className={s.usersPage_grid}>
                {
                    users?.data.data.map(user => (

                        <UserCard key={user.id}
                            onClick={() => handleClick(user.id)}
                            user={user}/>
                    ))
                }
            </div>
        </>
    );
};
