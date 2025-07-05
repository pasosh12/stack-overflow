import './App.css'
import {Header} from "@/ui/Header/Header";
import {Routing} from "@/shared/routing";
import {useEffect} from "react";

function App() {
    // const { data, isLoading } = useMeQuery()
    // const dispatch = useAppDispatch()
    // useEffect(() => {
    //     if (isLoading) return
    //     if (data?.resultCode === ResultCode.Success) {
    //         dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    //     }
    // }, [isLoading])

    return (
        <>
            <Header/>
            <Routing/>
        </>
    )
}

export default App
