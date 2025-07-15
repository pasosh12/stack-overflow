import s from "./DeleteAccount.module.css";
import Button from "@mui/material/Button";
// import {Button} from "UI/button";

type DeleteAccountProps = {
    onCancel: () => void;
    onDelete: () => void;
}

export const DeleteAccount = ({
                                  onCancel,
                                  onDelete,
                              }: DeleteAccountProps) => {
    return (
        <div className={s.deleteAccount_wrapper}>
            <h2>Are you to sure to DELETE your profile?</h2>
            <div className={s.deleteAccount_buttons}>
                <Button onClick={onCancel}>No, Cancel</Button>
                <Button onClick={onDelete} variant="outlined">
                    Yes, Delete NOW
                </Button>
            </div>
        </div>
    );
};
