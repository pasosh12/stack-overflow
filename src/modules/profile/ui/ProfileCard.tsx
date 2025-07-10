import Button from "@mui/material/Button";
import {useState} from "react";
import {DeleteAccount} from "@/modules/profile/ui/DeleteAccount";
import {useNavigate} from "react-router-dom";
import {useDeleteAccountMutation} from "@/modules/profile/model/profile-api";
import {User} from "@/modules/auth";
import s from './Profile.module.css'
import UserDefaultAvatar from "@/shared/assets/defaultAvatar.jpg";
import {EditProfileInfo} from "@/modules/profile/ui/EditProfileInfo";

type PropsType = {
    profileInfo: User
}

export const ProfileCard = ({profileInfo}: PropsType) => {
    const {username, role, id} = {...profileInfo}
    const navigate = useNavigate()
    const [isEditAccountOpen, setIsEditAccountOpen] = useState(false);
    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
    const [deleteMyInfo] = useDeleteAccountMutation()
    const handleEditProfile = () => {
        setIsEditAccountOpen((prev) => !prev);
    };
    const handleDeleteProfile = () => {
        setIsDeleteAccountOpen((prev) => !prev);
    };
    const handleCancelOnDelete = () => {
        setIsDeleteAccountOpen(false);
    };

    const handleDeleteOnDelete = () => {
        if (!confirm("Are you sure you want to delete your account?")) {
            setIsDeleteAccountOpen(false);
            navigate('/login')
            return;
        }
        deleteMyInfo();
        setIsDeleteAccountOpen(false);
    };
    return (
        <>
            <div className={s.account_wrapper}>
                <h2>Welcome, {username}</h2>
                <div className={s.account_content}>
                    <img src={UserDefaultAvatar}
                        className={s.account_avatar}
                    />
                    <div className={s.account_info}>
                        <div>Username: {username}</div>
                        <div>Role: {role}</div>
                        <div>ID: {id}</div>
                    </div>
                </div>
                <div className={s.account_button_wrapper}>
                    <Button onClick={handleEditProfile}>&#x270E; Edit profile</Button>
                    <Button variant="outlined" onClick={handleDeleteProfile}>
                        &#128465; Delete profile
                    </Button>
                </div>
            </div>
            {isDeleteAccountOpen && (
                <DeleteAccount
                    onCancel={handleCancelOnDelete}
                    onDelete={handleDeleteOnDelete}
                />
            )}
            {isEditAccountOpen && <EditProfileInfo/>}
        </>
    )
}