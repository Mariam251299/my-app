import { Card, CardContent, TextField, Button, Alert } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'


const Login = ({ setToken }) => {
    const [ alert, setAlert  ] = useState({ text: '', show: false });

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const { text, show } = alert;

    const handleSubmit = async e => {
        e.preventDefault();
        
        if(username == '' || password == '') {
            setAlert({ text: 'Faltan datos', show: true });
            return;
        }

        const response = await axios.post('http://127.0.0.1:8000/login', {
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
            <Card style={{ width: 600, margin: 'auto', marginTop: 100, padding: 20 }}>
                <CardContent>
                    { show && <Alert severity="error">{text}</Alert>}
                    <br />
                    <TextField id="outlined-basic" label="Usuario" variant="outlined" fullWidth onChange={e => setUserName(e.target.value)} />
                    <br />
                    <br />
                    <TextField id="outlined-basic" label="Contraseña" variant="outlined" fullWidth onChange={e => setPassword(e.target.value)} type={'password'}/>
                    <br />
                    <br />
                    <Button variant="outlined" onClick={handleSubmit}>Ingresar</Button>
                </CardContent>
            </Card>
        </div>
    );
}
export default Login;