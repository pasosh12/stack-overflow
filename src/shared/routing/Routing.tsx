import {selectIsAuthenticated} from "@/app/app-slice"
import {Route, Routes} from "react-router"
import {PageNotFound} from "@/ui/PageNotFound/PageNotFound";
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {ProtectedRoute} from "@/ui/ProtectedRoute/ProtectedRoute";
import {LoginPage} from "@/pages/LoginPage";
import {HomePage} from "@/pages/HomePage";

export const Path = {
    Main: "/",
    Login: "login",
    NotFound: "*",
} as const

export const Routing = () => {
    const isLoggedIn = useAppSelector(selectIsAuthenticated)

    return (
        <Routes>
            <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login} />}>
                <Route path={Path.Main} element={<HomePage />} />
            </Route>
            <Route element={<ProtectedRoute isAllowed={!isLoggedIn} />}>
                <Route path={Path.Login} element={<LoginPage />} />
            </Route>
            <Route path={Path.NotFound} element={<PageNotFound />} />
        </Routes>
    )
}
