import React from 'react';
import styles from "@/shared/ui/Header/Header.module.css";
import {Path} from "@/shared/routing";
import {selectIsAuthenticated, setLogout} from "@/app/app-slice";
import {baseApi} from "@/shared/api/base-api";
import {useLogoutMutation} from "@/modules/auth";
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {useNavigate} from "react-router-dom";

export const HeaderActionButtons = () => {
    const [logout] = useLogoutMutation()
    const isAuth = useAppSelector(selectIsAuthenticated)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        await logout().unwrap()
        dispatch(setLogout())
        dispatch(baseApi.util.invalidateTags(["Auth"]))
        navigate('/')
    }
    return (
        <>
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
        </>
    );
};
