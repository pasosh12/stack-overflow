import {selectAppError, selectAppSuccess, setAppErrorAC, setAppSuccessAC} from "@/app/app-slice"
import {SyntheticEvent} from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";
import {useAppSelector} from "@/shared/hooks/use-app-selector";

export const MessageSnackbar = () => {
    const error = useAppSelector(selectAppError)
    const successMessage = useAppSelector(selectAppSuccess)

    const dispatch = useAppDispatch()

    const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return
        }

        if (error) {
            dispatch(setAppErrorAC({error: null}))
        }
        if (successMessage) {
            dispatch(setAppSuccessAC({successMessage: null}))
        }

    }

    return (
        <>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" variant="filled" sx={{width: "100%"}}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={successMessage !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{width: "100%"}}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    )
}
