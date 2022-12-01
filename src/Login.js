import { Card, CardContent, TextField, Button} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'


const Login = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
        const response = await axios.post('http://127.0.0.1:8000/login', {
            username,
            password
        });
      setToken(response.data);
    }
    return (

        <div>
            <Card style={{width: 600, margin: 'auto', marginTop: 100, padding: 20}}>
                <CardContent>
                    <TextField id="outlined-basic" label="Usuario" variant="outlined" fullWidth onChange={e => setUserName(e.target.value)}/>
                    <br/>
                    <br/>
                    <TextField id="outlined-basic" label="Contraseña" variant="outlined" fullWidth onChange={e => setPassword(e.target.value)}/>
                    <br/>
                    <br/>
                    <Button variant="outlined" onClick={handleSubmit}>Ingresar</Button>  
                </CardContent>
            </Card>
        </div>
    );
}
export default Login;