import { Container, Grid, Button, Box } from "@mui/material";

import React, { useContext, useState } from "react";
import { Context } from "../..";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const Login = () => {
    const {auth} = useContext(Context)
    const [user, setUser] = useState("")

    const login = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then(
            (result) => {
                setUser(result.user)
            }
        )
    }

    return (
        <Container style={{backgroundColor: "white"}}>
            <Grid container
                style={{ height: window.innerHeight - 100}}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Grid
                    style={{ width: 400, background: 'rgb(248, 248, 248)', borderRadius: "5px" }}
                    container
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Box p={5}>
                        <Button onClick={login} variant="outlined">Login with Google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;