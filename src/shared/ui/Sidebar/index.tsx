import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";
import clsx from "clsx";
import {useFilteredNavItems} from "@/shared/hooks/use-filtered-nav-items";

export const Sidebar = () => {
    const filteredNavItems = useFilteredNavItems();
    return (
        <aside className={clsx(s.sidebar)}>
            <nav>
                <ul>
                    {filteredNavItems.map(({path, label, icon}) => {
                        return (
                            <li key={path}>
                                <NavLink to={path} className={isActive => isActive ? s.active : ''}>
                                    {icon}{label}
                                </NavLink>
                            </li>
                        )
                    })
                    }
                </ul>
            </nav>
        </aside>

    )
}