import { Path } from "@/shared/routing"
import Container from "@mui/material/Container"
import styles from "./PageNotFound.module.css"
import {Button} from "@/ui/Button";
import {useNavigate} from "react-router-dom";

export const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>page not found</h2>
            <Button variant="contained"
                    onClick={()=>navigate(Path.Main)}
                    style={{ width: "330px", marginTop: "20px" }}>
                Back to main
            </Button>
        </Container>
    )
}
