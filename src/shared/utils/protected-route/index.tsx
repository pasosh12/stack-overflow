import {Path} from "@/shared/routing"
import {Navigate, Outlet} from "react-router"

type Props = {
    isAllowed: boolean
    redirectPath?: string
}

export const ProtectedRoute = ({isAllowed, redirectPath = Path.Login}: Props) => {
    return isAllowed ? <Outlet/> : <Navigate to={redirectPath} replace/>
}
