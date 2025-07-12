import React from 'react';
import styles from './Header.module.css'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {selectIsAuthenticated, setLogout} from "@/app/app-slice";
import {useLogoutMutation} from "@/modules/auth";
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";
import {baseApi} from "@/shared/api/base-api";
import {Path} from "@/shared/routing";

export const Header = () => {
    const isAuth = useAppSelector(selectIsAuthenticated)
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const showCreateQuestionButton = location.pathname === Path.Questions

    const handleLogout = () => {
        logout().then(() => {
            dispatch(setLogout())

        }).then(() => {
            dispatch(baseApi.util.invalidateTags(["Auth"]))
        })
    }

return (
    <header className={styles.header}>
        <Link to="/" className={styles.logo}>Stack overflow</Link>

        <div className={styles.actions}>
            {showCreateQuestionButton && (
                <button className={styles.header_action_button}
                    onClick={()=>navigate(Path.CreateQuestion)}>
                    Ask Question
                </button>
            )}
            {isAuth ?
                <button className={styles.header_action_button}
                        onClick={handleLogout}>
                    Log out
                </button>
                :
                <button
                    className={styles.header_action_button}
                    onClick={() => navigate(Path.Login)}>
                    Log in
                </button>
            }
        </div>
    </header>
)}

