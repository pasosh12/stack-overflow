import s from "./ChangePassword.module.css";
import {Button} from "@/shared/ui/Button";
import {useChangePasswordMutation} from "@/modules/profile/model/profile-api";
import {TextField} from "@/shared/ui/TextArea";
import {z} from "zod";
import {passwordSchema} from "@/shared/schemas/auth/credentials-dto-schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const changePasswordSchema = z.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {message: "Confirm password must be equal to password"})
    .refine(data => data.newPassword !== data.oldPassword, {message: "New password must be not equal to old password"})

type ChangePasswordInputs = z.infer<typeof changePasswordSchema>

export const ChangePasswordForm = () => {

    const [changePassword, {
        isLoading,
    }] = useChangePasswordMutation();

    const {
        register, handleSubmit, formState: {errors},
        reset: resetForm,
    } = useForm<ChangePasswordInputs>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onChange",
        reValidateMode: "onChange"
    })

    const onSubmit = async (data: ChangePasswordInputs) => {
        // try {
        await changePassword({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }).unwrap();

        resetForm();
        alert("Password changed successfully");

    };


    return (
        <form className={s.changePasswordForm} onSubmit={handleSubmit(onSubmit)}>
            <TextField type={'password'}
                       className={s.changePasswordForm_input}
                       label="Enter OLD password:"
                       {...register('oldPassword')}
                       autoComplete={'current-password'}
                       disabled={isLoading}
                       errorMessage={errors.oldPassword?.message}
            />
            <TextField
                type={'password'}
                className={s.changePasswordForm_input}
                label="Enter NEW password:"
                {...register('newPassword')}
                errorMessage={errors.newPassword?.message}
                disabled={isLoading}

            />
            <TextField
                type={'password'}
                className={s.changePasswordForm_input}
                label="Confirm new password:"
                {...register('confirmPassword')}
                errorMessage={errors.confirmPassword?.message}
                disabled={isLoading}
            />
            <Button type={"submit"}
                    onClick={() => onSubmit}
            >
                {isLoading ? "Loading..." : "Save"}
            </Button>
        </form>

    );
};
