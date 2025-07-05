import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useLoginMutation, useMeQuery} from "@/modules/auth/model/auth-api";
import {CredentialsDto, LoginInputs} from "@/shared/schemas/auth/credentials-dto-schema";
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";
import {setUser} from "@/app/app-slice";

export const LoginForm = () => {
    const {register, handleSubmit, formState} = useForm<LoginInputs>({
        resolver: zodResolver(CredentialsDto),
    })
    const {refetch} = useMeQuery()
    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useAppDispatch()
    const onSubmit = async (data: LoginInputs) => {
        try {
            const res = await login(data).unwrap()
            refetch()
            console.log(res)
            if (res && res?.message === 'Successfully logged in!') {
                dispatch(setUser({user: res.data}))
            }

        } catch (error) {
            console.error('Ошибка входа:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input {...register('username')} placeholder="User name"/>
            <input {...register('password')} type="password" placeholder="Password"/>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Log in'}
            </button>
            {formState.errors.username && <p>{formState.errors.username.message}</p>}
            {formState.errors.password && <p>{formState.errors.password.message}</p>}
        </form>
    )
}
