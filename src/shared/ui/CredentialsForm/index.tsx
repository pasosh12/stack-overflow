import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CredentialsDto, LoginInputs} from "@/shared/schemas/auth/credentials-dto-schema";
import s from "./CredentialsForm.module.css";

type Props = {
    onSubmit: (data: LoginInputs) => void | Promise<void>;
    isLoading?: boolean;
};

export const CredentialsForm = ({onSubmit, isLoading}: Props) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginInputs>({
        resolver: zodResolver(CredentialsDto),
        mode: "onChange",
    });

    return (
        <div className={s.wrapper}>
            <form className={s.form}
                  onSubmit={handleSubmit(onSubmit)}
                  style={{display: "flex", flexDirection: 'column', alignItems: "center", gap: "10px"}}
            >
                <input
                    className={s.input}
                    {...register("username")} placeholder="User name"/>
                {errors.username && <p style={{color: "red"}}>{errors.username.message}</p>}

                <input
                    className={s.input}
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                />
                {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}

                <button
                    className={s.button}
                    type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};
