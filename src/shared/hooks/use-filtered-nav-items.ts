import { selectIsAuthenticated } from "@/app/app-slice";
import { useAppSelector } from "./use-app-selector";
import {NAV_ITEMS} from "@/shared/constants/navigation";

export const useFilteredNavItems = () => {
    const isLoggedIn = useAppSelector(selectIsAuthenticated);
    return isLoggedIn
        ? NAV_ITEMS
        : NAV_ITEMS.filter(item => !item.authOnly);
};