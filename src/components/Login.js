import { Card, CardContent, TextField, Button, Alert } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react'
// import './Styles.css'

const Login = ({ setToken }) => {
    const [alert, setAlert] = useState({ text: '', show: false });

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const { text, show } = alert;

    const handleSubmit = async e => {
        e.preventDefault();

        if (username == '' || password == '') {
            setAlert({ text: 'Faltan datos', show: true });
            return;
        }

        const response = await axios.post('http://127.0.0.1:8000/user/login', {
            username,
            password
        });

        if (!response.data.status) {
            setAlert({ text: 'Credenciales incorrectas', show: true });
            return;
        }

        setToken(response.data);
    }

    return (

        <div>
            <Card className="myCard">
                <CardContent>
                    {show && <Alert severity="error">{text}</Alert>}
                    <br />
                    <TextField id="outlined-basic" label="Usuario" variant="outlined" fullWidth onChange={e => setUserName(e.target.value)} />
                    <br />
                    <br />
                    <TextField id="outlined-basic" label="Contraseña" variant="outlined" fullWidth onChange={e => setPassword(e.target.value)} type={'password'} />
                    <br />
                    <br />
                    <Box textAlign='center'>
                        <Button variant="outlined" onClick={handleSubmit}>Ingresar</Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}
export default Login;