import { useState } from 'react';

export const useForm = ( initialState ) => {
    
    const [fields, setFields] = useState(initialState);

    const reset = () => {
        setFields( initialState );
    }

    const formChange = ( field, value) => {

        setFields({
            ...fields,
            [ field ]: { ...fields[field], value }
        });

    }

    const isValid = () => {
        let isValid = true;
        let propertys = Object.entries(fields);
        propertys.forEach((element) => {
            if(element[1].obligatory && element[1].value == "") isValid = false;
        });
        return isValid;
    }

    const getInfo = () => {
        let info = {};
        let propertys = Object.entries(fields);
        propertys.forEach((element) => {
            info = {...info, [element[0]]: element[1].value}
        });
        return info;
    }

    return { fields, formChange, reset, setFields, isValid, getInfo };

}