import {useEffect, useState} from "react";

export const useMobileSidebar = (breakPoint = 600) => {

    const [isMobile, setIsMobile] = useState(breakPoint > window.innerWidth);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakPoint);
            if (window.innerWidth >= breakPoint) setMobileSidebarOpen(false);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakPoint]);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen)
    }
    const closeSidebar = () => {
        setMobileSidebarOpen(false)
    }

    return {isMobile, toggleSidebar, mobileSidebarOpen, closeSidebar}
}
