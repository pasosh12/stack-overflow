import React from 'react';
import {ProfileCard} from "@/modules/profile/ui/ProfileCard";
import {useGetProfileInfoQuery} from "@/modules/profile/model/profile-api";
import {CircularProgress} from "@mui/material";


export const ProfilePage = () => {
    const {data: profileData} = useGetProfileInfoQuery()
    if (!profileData) return <CircularProgress/>
    return (
        <div>
            <ProfileCard profileInfo={profileData.data}/>
        </div>
    );
};

