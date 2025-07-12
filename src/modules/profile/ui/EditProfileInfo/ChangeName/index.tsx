import {useEffect, useState} from "react";
import styles from "./ChangeUserName.module.css";
import {TextField} from "@/shared/ui/TextField";
import {Button} from "@/shared/ui/Button";
import {useChangeProfileNameMutation} from "@/modules/profile/model/profile-api";

export const ChangeNameForm = () => {
    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [editUserName ] = useChangeProfileNameMutation();

    const onSubmit = () => {
        if (value.length < 3) {
            setErrorMessage("Username must have over 3 symbols");
            return;
        }
        editUserName({username:value});
        setValue("");
        alert("Username changed successfully");
    };

    useEffect(() => {
        if (errorMessage) {
            setErrorMessage("");
        }
    }, [value]);

    return (
        <form className={styles.changeNameForm_wrapper}>
            <TextField
                errorMessage={errorMessage}
                className={styles.changeNameForm_input}
                label="Change your username: "
                onChange={(e) => setValue(e.target.value)}
            />
            <Button onClick={onSubmit}>Save</Button>
        </form>
    );
};