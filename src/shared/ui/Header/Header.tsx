import React from 'react';
import styles from './Header.module.css'
import {Link, useNavigate} from 'react-router-dom';
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {selectIsAuthenticated, setLogout} from "@/app/app-slice";
import {useLogoutMutation} from "@/modules/auth";
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";
import {baseApi} from "@/shared/api/base-api";

export const Header = () => {
    const isAuth = useAppSelector(selectIsAuthenticated)
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout().then(() => {
                dispatch(setLogout())
            }
        ).then(() => {
            dispatch(baseApi.util.invalidateTags(["Auth"]))
        })
    }
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>Stack overflow</Link>

            {/*<nav className={styles.nav}>*/}
            {/*    <Link to="/">Home</Link>*/}
            {/*    <Link to="/create">Create post</Link>*/}
            {/*    <Link to="/profile">Profile</Link>*/}
            {/*</nav>*/}

            <div className={styles.actions}>
                {isAuth ? <button onClick={handleLogout}>Log out</button> :
                    <button onClick={()=>navigate('/login')}>
                        Log in</button>}
            </div>
        </header>
    );
};

