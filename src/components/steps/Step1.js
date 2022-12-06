import { Button, Card, CardContent, createMuiTheme, Grid, List, ListItemButton, ListItemText, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";

const dbTypes = [
    { name: 'MySql', id: 1 },
    { name: 'Postgres', id: 2 }
]

const Step1 = ({ setStep, setDatabases }) => {

    const [selectedIndex, setSelectedIndex] = useState(1);
    // const { instances, setInstances } = instanceUtils;
    const [instances, setInstances] = useState([]);

    const { fields, isValid, formChange, getInfo, reset } = useForm({
        host: {
            obligatory: true,
            value: 'stack-rds-axolotech-e-comer-and-app-dev-rdsdb-nyfeg8ra2kys.cnmbtvnxnbpx.us-east-1.rds.amazonaws.com'
        },
        username: {
            obligatory: true,
            value: 'root'
        },
        password: {
            obligatory: true,
            value: '$rdbaxolotech.0937.2022'
        },
        database: {
            obligatory: true,
            value: 'almacenes_de_datos'
        }
    });

    const { host, username, password, database } = fields;

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    }

    const handleAdd = () => {
        // console.log(getInfo());

        const newInstance = {
            id: instances.length + 1,
            type: dbTypes.find(({id}) => selectedIndex == id).name,
            ...getInfo()
        }

        setInstances((current) => [...current, newInstance]);

        setSelectedIndex(1);
        reset();
    }

    const handleRemoveItem = (id) => {
        const filterdIntances = instances.filter((instance) => instance.id != id);
        const updatedInstances = filterdIntances.map((instance, index) => { return { ...instance, id: index + 1 } });
        // console.log(updatedInstances);
        setInstances(updatedInstances);
    }

    const handleContinue = async () => {
        const token = JSON.parse(localStorage.getItem('token')).token;

        const response = await axios.post('http://127.0.0.1:8000/data/get-databases', {
            instances
        }, { headers: { authorization: token } });

        // console.log(response.data.instancesData);
        setDatabases(response.data.instancesData)
        setStep((step) => step + 1)
    }

    return (
        <div>
            <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
                <Grid item xs={6}>
                    <Card className="myCard">
                        <CardContent>
                            <p>Tipo de base de datos</p>
                            <List component="nav" aria-label="secondary mailbox folder" sx={{
                                // selected and (selected + hover) states
                                '&& .Mui-selected, && .Mui-selected:hover': {
                                    bgcolor: '#78C6FF'
                                },
                            }}>
                                {
                                    dbTypes.map(({ id, name }) => {
                                        return (
                                            <ListItemButton
                                                key={id}
                                                selected={selectedIndex === id}
                                                onClick={(event) => handleListItemClick(event, id)}
                                                classes={{ selected: { backgroundColor: 'red' } }}
                                            >
                                                <ListItemText primary={ name } />
                                            </ListItemButton>
                                        )
                                    })
                                }
                            </List>
                            <p>Datos de conexión</p>
                            <TextField label="Host" variant="outlined" fullWidth
                                value={host.value}
                                onChange={(e) => { formChange('host', e.target.value) }}
                            />
                            <br />
                            <br />
                            <TextField label="Usuario" variant="outlined" fullWidth
                                value={username.value}
                                onChange={(e) => { formChange('username', e.target.value) }}
                            />
                            <br />
                            <br />
                            <TextField label="Contraseña" variant="outlined" fullWidth type={'password'}
                                value={password.value}
                                onChange={(e) => { formChange('password', e.target.value) }}
                            />
                            <br />
                            <br />
                            <TextField label="base de datos" variant="outlined" fullWidth
                                value={database.value}
                                onChange={(e) => { formChange('database', e.target.value) }}
                            />
                            <br />
                            <br />
                            <Box textAlign='center'>
                                <Button variant="outlined" onClick={handleAdd}>Agregar</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className="myCard">
                        <CardContent>
                            { instances.length <= 0 && <p style={{textAlign: 'center'}}>No se han agregado instancias</p> }
                            {
                                instances.map(({ type, host, username, database, id }, index) => {
                                    return (
                                        <div key={index} style={{border: '1px solid #C2C2C2', borderRadius: 8, padding: 20, marginBottom: 20}}>
                                            <p style={{fontWeight: 'bold', fontSize: 20}}>{type}</p>
                                            <p><span style={{fontWeight: 'bold'}}>Host: </span> {host}</p>
                                            <p><span style={{fontWeight: 'bold'}}>Usuario: </span> {username}</p>
                                            <p><span style={{fontWeight: 'bold'}}>Base de datos: </span> {database}</p>
                                            <Button variant="text" color="error" onClick={() => { handleRemoveItem(id) }}>Eliminar</Button>
                                        </div>
                                    )
                                })
                            }
                            <Box textAlign='center'>
                                <Button variant="outlined" onClick={handleContinue} disabled={instances.length <= 0}>Continuar</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Step1;