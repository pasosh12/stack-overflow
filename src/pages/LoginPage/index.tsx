import React from 'react';
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {selectIsAuthenticated} from "@/app/app-slice";
import {LoginForm} from "@/modules/auth/ui/LoginForm";

export const LoginPage = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    return (
        <div className={'container'}>
            <h1>Log in</h1>
            <LoginForm/>
        </div>
    );
};