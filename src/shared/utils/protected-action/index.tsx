import {useAppSelector} from "@/shared/hooks/use-app-selector";
import {selectIsAuthenticated} from "@/app/app-slice";
import {ReactElement} from "react";

type ProtectedActionType = {
    children: ReactElement
    fallback?: string,
}
export const ProtectedAction = ({children, fallback = 'Login to action'}: ProtectedActionType) => {
    const isAuth = useAppSelector(selectIsAuthenticated)

    if (isAuth) return <>{children}</>
    return (
        <div
            title={fallback}
            style={{
                opacity: 0.8,
                pointerEvents: "none",
                cursor: "not-allowed",
                display: "inline-block",
            }}
        >
            {children}
        </div>
    )
}