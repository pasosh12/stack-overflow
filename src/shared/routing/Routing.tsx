import {selectIsAuthenticated} from "@/app/app-slice"
import {Route, Routes} from "react-router"
import {PageNotFound} from "@/shared/ui/PageNotFound/PageNotFound";
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {ProtectedRoute} from "@/shared/utils/protected-route";
import {LoginPage} from "@/pages/LoginPage";
import {HomePage} from "@/pages/HomePage";
import {RegisterPage} from "@/pages/RegisterPage";
import {SnippetPage} from "@/pages/SnippetsPage";
import {ProfilePage} from "@/pages/ProfilePage";
import {
    CREATE_SNIPPET_PAGE_LINK,
    HOME_PAGE_LINK, LOGIN_PAGE_LINK,
    MY_ACCOUNT_PAGE_LINK,
    MY_SNIPPETS_PAGE_LINK,
    QUESTIONS_PAGE_LINK, REGISTER_PAGE_LINK,
    SNIPPET_PAGE_LINK,
    USERS_PAGE_LINK
} from "@/shared/constants";
import {UsersPage} from "@/pages/UsersPage";
import {CreateSnippetPage} from "@/pages/CreateSnippetPage";
import {MySnippetsPage} from "@/pages/MySnippetPage";

export const Path = {
    Login: LOGIN_PAGE_LINK,
    Register: REGISTER_PAGE_LINK,
    NotFound: "*",
    Home: HOME_PAGE_LINK,
    Snippets: SNIPPET_PAGE_LINK,
    CreateSnippet: CREATE_SNIPPET_PAGE_LINK,
    MySnippets: MY_SNIPPETS_PAGE_LINK,
    Profile: MY_ACCOUNT_PAGE_LINK,
    Users: USERS_PAGE_LINK,
    Questions: QUESTIONS_PAGE_LINK,
    MyQuestions: QUESTIONS_PAGE_LINK,
} as const

export const Routing = () => {
    const isLoggedIn = useAppSelector(selectIsAuthenticated)
// console.log(isLoggedIn)
    return (
        <Routes>
            <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Login}/>}>
                <Route path={Path.Login} element={<LoginPage/>}/>
                <Route path={Path.Register} element={<RegisterPage/>}/>
            </Route>
            <Route element={<ProtectedRoute isAllowed={isLoggedIn}/>}>
                <Route path={Path.Profile} element={<ProfilePage/>}/>
                <Route path={Path.CreateSnippet} element={<CreateSnippetPage/>}/>
                <Route path={Path.MySnippets} element={<MySnippetsPage/>}/>
            </Route>
            <Route path={Path.Users} element={<UsersPage/>}/>
            <Route path={Path.Questions} element={<div>Questions page</div>}/>
            <Route path={Path.MyQuestions} element={<div>My Questions page</div>}/>
            <Route path={Path.Home} element={<HomePage/>}/>
            <Route path={`${Path.Snippets}/:id`} element={<SnippetPage/>}/>
            <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    )
}
