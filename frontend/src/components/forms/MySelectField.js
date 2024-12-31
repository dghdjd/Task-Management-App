import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {Controller} from "react-hook-form";

export default function MySelectField(props) {
    const {label, name, control, width} = props
    return (
        <Box sx={{width:{width}}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Controller
                    name={name}
                    control={control}
                    render={({
                                 field: {onChange, value},
                                 fieldState: {error},
                                 formState
                             }) => (
                        <Select
                            labelId={`${name}-label`}
                            id={`${name}-select`}
                            value={value || ''}
                            label={label}
                            onChange={onChange}

                        >
                            <MenuItem value={"In Progress"}>In Progress</MenuItem>
                            <MenuItem value={"Completed"}>Completed</MenuItem>
                        </Select>
                    )

                    }

                />


            </FormControl>
        </Box>
    );
}
