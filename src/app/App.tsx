import './App.css'
import {Header} from "@/shared/ui/Header/Header";
import {Routing} from "@/shared/routing";
import {useEffect} from "react";
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";
import {useAuthQuery, UserResponse} from "@/modules/auth";
import {setIsLoggedIn, setUser} from "@/app/app-slice";
import {CircularProgress} from "@mui/material";
import {Sidebar} from "@/shared/ui/Sidebar";
import {MessageSnackbar} from "@/shared/ui/Snackbar";

function App() {

    const {data, refetch, isLoading} = useAuthQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data) {
            const user: UserResponse = data
            dispatch(setUser({user: user.data}))
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        }
    }, [dispatch, data, refetch])


    if (isLoading) {
        return (
            <div className='circularProgressContainer'>
                <CircularProgress size={150} thickness={3}/>
            </div>
        );
    }
    return (
        <div className='layout'>
            <Header/>
            <div className='layout-content'>
                <Sidebar/>
                <main className='main-content'>
                    <Routing/>
                </main>
                <MessageSnackbar/>
            </div>
        </div>
    )
}

export default App
