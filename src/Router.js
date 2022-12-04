import React from "react";
import App from "./App";
import Login from "./Login";
import useToken from './Hooks/useToken';


const Router = () => {

    
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />
    }



    return (
        <div>
            <App />
        </div>
    );
}

export default Router;