import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Controller, controller} from 'react-hook-form'

export default function MyTextField(props) {
    const {label, placeholder, name, control, width, type, externalError } = props
    return (

        <Controller
            name={name}
            control={control}
            rules={{required: `Please enter ${name}`}}
            render={({
                         field: {onChange, value},
                         fieldState: {error},
                         formState,
                     }) => (

                <TextField
                    sx={{width: {width}}}
                    type={type}
                    onChange={onChange}
                    value={value}
                    id="outlined-basic"
                    label={label}
                    variant="outlined"
                    placeholder={placeholder}
                    error={!!error || !!externalError}
                    helperText={error?.message || externalError || ''}
                />

            )

            }

        />


    );
}
