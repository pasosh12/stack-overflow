import React from 'react';
import {ProfileCard} from "@/modules/profile";
import {CircularProgress} from "@mui/material";
import {useAppSelector} from "@/shared/hooks";
import {selectUser} from "@/app/app-slice";
import {useParams} from "react-router-dom";
import {useGetUserByIdQuery, useGetUserStatisticsQuery} from "@/modules/users/model/users-api";


export const ProfilePage = () => {
    const {id} = useParams()
    const myId = useAppSelector(selectUser)?.id
    const isMe = !id || Number(myId) === Number(id)
    const profileId = id ? Number(id) : Number(myId)

    const {data: profileData} = useGetUserByIdQuery(profileId)
    const {data: statistic} = useGetUserStatisticsQuery(profileId)

    if (!profileData || !statistic) return <CircularProgress/>
    return (
        <div>
            <ProfileCard profileInfo={profileData?.data}
                         statistic={statistic?.data.statistic}
                         isMe={isMe}/>
        </div>
    );
};

