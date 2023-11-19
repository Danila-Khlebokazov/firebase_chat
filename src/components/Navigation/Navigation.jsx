import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/constants';
import { useAuthState } from "react-firebase-hooks/auth"
import { Context } from "../../index";
import { getAuth, signOut } from "firebase/auth";

export default function Navigation() {
    const { auth } = React.useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container justifyContent={"flex-end"}>
                        {user ? <Button onClick={() => signOut(auth)} variant='outlined' color="inherit">Logout</Button> : 
                        <NavLink to={LOGIN_ROUTE}>
                        <Button variant='outlined' color="inherit">Login</Button>
                        </NavLink>
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}