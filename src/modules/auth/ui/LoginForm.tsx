import {useLoginMutation, useAuthQuery} from "@/modules/auth/model/auth-api";
import {LoginInputs} from "@/shared/schemas/auth/credentials-dto-schema";
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";
import {setIsLoggedIn, setUser} from "@/app/app-slice";
import {CredentialsForm} from "@/shared/ui/CredentialsForm";


export const LoginForm = () => {
    const {refetch} = useAuthQuery()
    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useAppDispatch()
    const handleLogin = async (data: LoginInputs) => {
        try {
            const res = await login(data).unwrap()
            refetch()
            if (res && res?.message === 'Successfully logged in!') {
                dispatch(setUser({user: res.data}))
                dispatch(setIsLoggedIn({isLoggedIn:true}))
            }
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    return (
        <CredentialsForm onSubmit={handleLogin} isLoading={isLoading} />
    )
}
