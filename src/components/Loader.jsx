import React from "react";
import { Container, Grid, Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
    return (<Container>
        <Grid container
            style={{ height: window.innerHeight - 100 }}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Grid
                container
                alignItems={"center"}
                direction={"column"}
            >
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Grid>
        </Grid>
    </Container>);
}

export default Loader;