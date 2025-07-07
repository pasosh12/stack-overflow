import './App.css'
import {Header} from "@/ui/Header/Header";
import {Routing} from "@/shared/routing";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";
import {useMeQuery, UserResponse} from "@/modules/auth";
import {setIsLoggedIn, setUser} from "@/app/app-slice";
import {CircularProgress} from "@mui/material";

function App() {
    const [isInitialized, setIsInitialized] = useState(false)
    const {refetch, isLoading} = useMeQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        refetch().then(res => {
            if (res.data) {
                const user: UserResponse = res.data
                dispatch(setUser({user: user.data}))
                dispatch(setIsLoggedIn({isLoggedIn: true}))
            }
        })
        setIsInitialized(true)
    }, [])

    if (!isInitialized || isLoading) {
        return (
            <div className='circularProgressContainer'>
                <CircularProgress size={150} thickness={3}/>
            </div>
        );
    }
    return (
        <>
            <Header/>
            <Routing/>
        </>
    )
}

export default App
