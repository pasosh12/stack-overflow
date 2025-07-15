import React from "react";
import {useRegisterMutation} from "@/modules/auth/model/auth-api";
import {CredentialsForm} from "@/shared/ui/CredentialsForm";
import {LoginInputs} from "@/shared/schemas/auth/credentials-dto-schema";
import {useNavigate} from "react-router-dom";

export const RegisterPage = () => {
    const [register, {isLoading}] = useRegisterMutation();
    const navigate = useNavigate()
    const handleRegister = async (data: LoginInputs) => {
        try {
            await register(data).unwrap();
            navigate('/login')
        } catch (err) {
            console.error("Registration error:", err);
        }
    };

    return (
        <>
            <h2>Sign up</h2>
            <CredentialsForm onSubmit={handleRegister} isLoading={isLoading}/>
        </>
    );
};
