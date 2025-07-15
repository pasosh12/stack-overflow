import React from 'react';
import {NavLink} from 'react-router-dom';
import clsx from 'clsx';
import {useFilteredNavItems} from "@/shared/hooks/use-filtered-nav-items";
import s from './MobileSidebar.module.css'
import {useClickAway} from "@uidotdev/usehooks";
import {HeaderActionButtons} from "@/shared/ui/Header/HeaderActionButtons";

type PropsType = {
    isOpened: boolean
    toggleSidebar: () => void
    closeSidebar: () => void
}
export const MobileSidebar = ({isOpened, toggleSidebar, closeSidebar}: PropsType) => {
    const visibleLinks = useFilteredNavItems()
    const ref = useClickAway<HTMLDivElement>(() => {
        closeSidebar()
    })
    return (
        <>
            <div ref={ref} className={clsx(s.sidebar, {[s.open]: isOpened})}>
                <div className={s.sidebarContent}>
                    <nav className={s.nav}>
                        <ul>
                            {visibleLinks.map(({path, label, icon}) => (
                                <li key={path}>
                                    <NavLink
                                        to={path}
                                        className={({isActive}) => clsx(s.link, {[s.active]: isActive})}
                                        onClick={toggleSidebar}
                                    >
                                        {icon}{label}
                                    </NavLink>

                                </li>
                            ))
                            }
                            <li onClick={toggleSidebar}><HeaderActionButtons/></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};