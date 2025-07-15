import s from "./EditProfileInfo.module.css";
import clsx from "clsx";
import {ChangeNameForm} from "@/modules/profile/ui/EditProfileInfo/ChangeName";
import {ChangePasswordForm} from "@/modules/profile/ui/EditProfileInfo/ChangePassword";

type EditProfileProps = {
    className?: string;
}

export const EditProfileInfo = ({className}: EditProfileProps) => {
    const editAccountClassName = clsx(className, s.editAccount_wrapper);
    return (
        <div className={editAccountClassName}>
            <h2>Edit your profile:</h2>
            <div className={s.editAccount_content}>
                <ChangeNameForm/>
                <ChangePasswordForm/>
            </div>
        </div>
    );
};