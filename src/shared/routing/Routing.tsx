import {selectIsAuthenticated} from "@/app/app-slice"
import {Route, Routes} from "react-router"
import {PageNotFound} from "@/ui/PageNotFound/PageNotFound";
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {ProtectedRoute} from "@/ui/ProtectedRoute/ProtectedRoute";
import {LoginPage} from "@/pages/LoginPage";
import {HomePage} from "@/pages/HomePage";
import {RegisterPage} from "@/pages/RegisterPage";
import {PostPage} from "@/pages/PostPage";

export const Path = {
    Main: "/",
    Login: "login",
    Register: "register",
    Post : "post",
    Profile:"profile",
    NotFound: "*",
} as const

export const Routing = () => {
    const isLoggedIn = useAppSelector(selectIsAuthenticated)

    return (
        <Routes>
            <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login} />}>
                <Route path={Path.Main} element={<HomePage />} />
                <Route path={`${Path.Post}/:id`} element={<PostPage />} />
                <Route path={Path.Profile} element={<div>My account</div >} />
            </Route>
            <Route element={<ProtectedRoute isAllowed={!isLoggedIn} />}>
                <Route path={Path.Login} element={<LoginPage />} />
                <Route path={Path.Register} element={<RegisterPage />} />
            </Route>
            <Route path={Path.NotFound} element={<PageNotFound />} />
        </Routes>
    )
}
