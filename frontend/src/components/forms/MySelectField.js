import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {Controller} from "react-hook-form";

export default function MySelectField(props) {
    const [age, setAge] = React.useState('');
    const {label, name, control, width} = props
    const handleChange = (event) => {
        setAge(event.target.value);
    };

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
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label={label}
                            onChange={handleChange}

                        >
                            <MenuItem value={10}>In Progress</MenuItem>
                            <MenuItem value={20}>Completed</MenuItem>
                        </Select>
                    )

                    }

                />


            </FormControl>
        </Box>
    );
}
