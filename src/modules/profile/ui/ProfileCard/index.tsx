import Button from "@mui/material/Button";
import {useState} from "react";
import {DeleteAccount} from "@/modules/profile/ui/DeleteAccount";
import {useNavigate} from "react-router-dom";
import {useDeleteAccountMutation} from "@/modules/profile/model/profile-api";
import {User} from "@/modules/auth";
import s from './Profile.module.css'
import UserDefaultAvatar from "@/shared/assets/defaultAvatar.jpg";
import {EditProfileInfo} from "@/modules/profile/ui/EditProfileInfo";
import {StatisticType} from "@/modules/users/model/userApi.types";

type PropsType = {
    profileInfo: User
    isMe: boolean,
    statistic: StatisticType
}

export const ProfileCard = ({isMe, profileInfo, statistic}: PropsType) => {
    const {username, role, id} = {...profileInfo}
    const navigate = useNavigate()
    const {
        rating, snippetsCount, commentsCount,
        likesCount, dislikesCount, questionsCount,
        correctAnswersCount, regularAnswersCount
    } = {...statistic}

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
                    <div className={s.account_title}>
                        <img alt={username} src={UserDefaultAvatar}
                             className={s.account_avatar}
                        />
                        <div className={s.account_info}>
                            <div>Username: {username}</div>
                            <div>Role: {role}</div>
                            <div>ID: {id}</div>
                        </div>
                    </div>
                    <div className={s.account_statistics}>
                        <p>Rating: {rating}</p>
                        <p>Snippets: {snippetsCount}</p>
                        <p>Comments: {commentsCount}</p>
                        <p>Likes: {likesCount}</p>
                        <p>Dislikes: {dislikesCount}</p>
                        <p>Questions: {questionsCount}</p>
                        <p>Correct Answers: {correctAnswersCount}</p>
                        <p>Regular Answers: {regularAnswersCount}</p>
                    </div>
                </div>
                {
                    isMe && (


                        <div className={s.account_button_wrapper}>
                            <Button onClick={handleEditProfile}>&#x270E; Edit profile</Button>
                            <Button variant="outlined" onClick={handleDeleteProfile}>
                                &#128465; Delete profile
                            </Button>
                        </div>
                    )
                }
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