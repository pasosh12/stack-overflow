import {useLoginMutation} from "@/modules/auth/model/auth-api";
import {LoginInputs} from "@/shared/schemas/auth/credentials-dto-schema";
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";
import {setIsLoggedIn, setUser} from "@/app/app-slice";
import {CredentialsForm} from "@/shared/ui/CredentialsForm";
import {Path} from "@/shared/routing";


export const LoginForm = () => {
    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useAppDispatch()


    const handleLogin = async (data: LoginInputs) => {
        try {
            const res=await login(data).unwrap()
            if (res.data) {
                dispatch(setUser({user: res.data}))
                dispatch(setIsLoggedIn({isLoggedIn: true}))
                window.location.href = Path.Home;

            }
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    return (
        <CredentialsForm onSubmit={handleLogin} isLoading={isLoading}/>
    )
}
