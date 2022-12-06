import React, { useState } from "react";
import useToken from './hooks/useToken';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Menu from "./components/Menu"
import Admin from "./components/Admin";

import './Styles.css'

const Router = () => {

    const { token, setToken } = useToken();

    if (!token) {
        // return <Login setToken={setToken} />
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                </Routes>
            </BrowserRouter>
        )
    }

    const getUser = () => {
        const user = JSON.parse(localStorage.getItem('token')).user;
        return user;
    }

    if (getUser().type === 1) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Menu />}>
                        <Route
                            index
                            element={<Navigate to="/home" replace />}
                        />
                        <Route path="/home" element={<Home />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route
                            path="*"
                            element={<Navigate to="/home" replace />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu />}>
                    <Route
                        index
                        element={<Navigate to="/home" replace />}
                    />
                    <Route path="/home" element={<Home />} />
                    <Route
                        path="*"
                        element={<Navigate to="/home" replace />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;