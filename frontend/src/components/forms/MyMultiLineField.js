import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Controller} from "react-hook-form";

export default function MyMultiLineField(props) {
    const {label, placeholder, name, control, width} = props
    return (

        <Controller
            name={name}
            control={control}
            rules={{required: "Can not leave empty"}}
            render={({
                         field: {onChange, value},
                         fieldState: {error},
                         formState,
                     }) => (

                    <TextField
                        sx={{width:{width}}}
                        id="outlined-multiline-static"
                        label={label}
                        multiline
                        minRows={4}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        error={!!error}
                        helperText={error ? error.message : ''}
                    />

            )

            }

        />


    );
}
