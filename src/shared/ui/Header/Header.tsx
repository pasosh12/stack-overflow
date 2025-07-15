import React from 'react';
import styles from './Header.module.css'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Path} from "@/shared/routing";
import {MobileSidebar} from "@/shared/ui/Sidebar/MobileSidebar";
import {useMobileSidebar} from "@/shared/hooks/use-mobile-sidebar";
import {HeaderActionButtons} from "@/shared/ui/Header/HeaderActionButtons";
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export const Header = () => {

    const breakpoint: number = 600
    const navigate = useNavigate()
    const location = useLocation()

    const {isMobile, toggleSidebar, mobileSidebarOpen, closeSidebar} = useMobileSidebar(breakpoint)
    const showCreateQuestionButton = location.pathname === Path.Questions


    if (isMobile) {
        return (
            <>
                <header className={styles.header}>
                    <Link to="/" className={styles.logo}>Stack overflow</Link>
                    <MenuRoundedIcon className={styles.header_sidebar_button} onClick={toggleSidebar}/>
                </header>
                <MobileSidebar isOpened={mobileSidebarOpen} toggleSidebar={toggleSidebar}
                               closeSidebar={closeSidebar}
                />
            </>
        )
    }
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <CodeRoundedIcon/>
                Stack overflow</Link>
            <div className={styles.actions}>
                {showCreateQuestionButton && (
                    <button className={styles.header_action_button}
                            onClick={() => navigate(Path.CreateQuestion)}>
                        Ask Question
                    </button>
                )}
                <HeaderActionButtons/>
            </div>
        </header>
    )
}

