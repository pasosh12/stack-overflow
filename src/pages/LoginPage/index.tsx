import React from 'react';

import {LoginForm} from "@/modules/auth/ui/LoginForm";
import {Link} from 'react-router-dom';

export const LoginPage = () => {


    return (
        <div className={'container'}>
            <h2>Log in</h2>
            <LoginForm/>
            <h3>Have no account yet? Follow
            <Link to='/register'> sign up </Link>
                link
            </h3>

        </div>
    );
};