import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";

const Admin = () => {

    const [step, setStep] = useState(0);
    const [databases, setDatabases] = useState([]);

    // if(step == 1) {
    //     return <Step1 instanceUtils={{instances, setInstances}} setStep={setStep} />
    // }

    // if(step == 2) {
    //     return <p>Paso 2</p>
    // }

    const StepScreen = () => {
        if(step == 0) return <Step1 setStep={setStep} setDatabases={setDatabases}/>
        if(step == 1) return <Step2 databases={databases} />
    }

    return (
        <>
            <Stepper activeStep={step}>
                <Step >
                    <StepLabel>
                        Primer paso
                    </StepLabel>
                </Step>
                <Step >
                    <StepLabel>
                        Segundo paso
                    </StepLabel>
                </Step>
                <Step >
                    <StepLabel>
                        Tercer paso
                    </StepLabel>
                </Step>
                <Step >
                    <StepLabel>
                        Cuarto paso
                    </StepLabel>
                </Step>
            </Stepper>
            {StepScreen()}
        </>
    )


}

export default Admin;