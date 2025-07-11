import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";
import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {selectIsAuthenticated} from "@/app/app-slice";
import {
    CREATE_SNIPPET_PAGE_LINK, HOME_PAGE_LINK,
    MY_ACCOUNT_PAGE_LINK, MY_QUESTIONS_PAGE_LINK,
    MY_SNIPPETS_PAGE_LINK,
    QUESTIONS_PAGE_LINK,
    USERS_PAGE_LINK
} from "@/shared/constants";

export const Sidebar = () => {
    const navItems = [
        {path: HOME_PAGE_LINK, label: "Home"},
        {path: MY_ACCOUNT_PAGE_LINK, label: "My account", authOnly: true},
        {path: CREATE_SNIPPET_PAGE_LINK, label: "Post Snippet", authOnly: true},
        {path: MY_SNIPPETS_PAGE_LINK, label: "My Snippets", authOnly: true},
        {path: QUESTIONS_PAGE_LINK, label: "Questions"},
        {path: MY_QUESTIONS_PAGE_LINK, label: "My Questions", authOnly: true},
        {path: USERS_PAGE_LINK, label: "Users"},
    ];
    const isLoggedIn = useAppSelector(selectIsAuthenticated);
    const visibleLinks = isLoggedIn ? navItems : navItems.filter(item => !item.authOnly)
    return (
        <aside className={s.sidebar}>
            <nav>
                <ul>
                    {visibleLinks.map(({path,label})=>{
                        return (
                        <li key={path}>
                            <NavLink to={path} className={isActive=>isActive ? s.active : ''}>
                                {label}
                            </NavLink>
                        </li>
                    )})
                    }
                </ul>
            </nav>
        </aside>
    )
}