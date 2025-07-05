import React from 'react';
import styles from './Header.module.css'
import { Link } from 'react-router-dom';
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {selectIsAuthenticated} from "@/app/app-slice";

export const Header = () => {
    const isAuth =useAppSelector(selectIsAuthenticated)
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}></Link>

            <nav className={styles.nav}>
                <Link to="/">Home</Link>
                <Link to="/create">Create post</Link>
                <Link to="/profile">Profile</Link>
            </nav>

            <div className={styles.actions}>
                {isAuth ? <button>Log out</button> : null}

            </div>
        </header>
    );
};

