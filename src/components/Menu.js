import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Menu = () => {

    const exit = () => {
        localStorage.clear();
        window.location.reload();
    }

    const getUser = () => {
        const user = JSON.parse(localStorage.getItem('token')).user;
        return user;
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Button component={Link} color="inherit" to="/home">Home</Button>
                    { getUser().type == 1 && <Button component={Link} color="inherit" to="/admin">Admin</Button> }
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <Button color="inherit" onClick={exit}>Salir</Button>
                </Toolbar>
            </AppBar>
            <div style={{padding: 10}}>
                <Outlet />
            </div>
        </>
    );
}

export default Menu;