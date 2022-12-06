import { Grid } from "@mui/material";
import React, { useState } from "react";

const Step2 = ({databases}) => {

    console.log(databases);

    return (
        <div>
            <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
                <Grid item xs={6}>
                    <p>Paso 2</p>
                </Grid>
            </Grid>
        </div>
    );
}

export default Step2;