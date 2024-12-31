import React from "react";
import {Box, Button} from '@mui/material'
import Typography from "@mui/material/Typography";
import MyDatePickerField from "./forms/MyDatePickerField";
import MySelectField from "./forms/MySelectField";
import MyTextField from "./forms/MyTextField";
import MyMultiLineField from "./forms/MyMultiLineField";
import {useForm} from "react-hook-form";
import Dayjs from "dayjs";
import AxiosInstance from "./Axios";
import {useNavigate} from "react-router-dom";


const Create = () =>{

    const defaultValues = {
        title: '',
        description: '',
        due_date:null
    }
    const navigate = useNavigate()
    const{handleSubmit, reset, setValue, control} = useForm({defaultValues})
    const submission = (data) => {

        const DueDate = data.due_date ? Dayjs(data.due_date["$d"]).format("YYYY-MM-DD") : null
        AxiosInstance.post( 'api/tasks/', {
            title: data.title,
            description: data.description,
            due_date: DueDate,
            status: data.status
        }).then((res) =>{
            if(res.status === 201) alert("MyTask created!")
            else alert("Failed to create the task.")
        }).catch((error) => {
            console.log(error)
            navigate("/login")
        })
    }


    return (
        <div>
            <form onSubmit={handleSubmit(submission)}>
            <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
                <Typography sx={{marginLeft:'20px', color:'#ffffff'}}>
                    Create Tasks
                </Typography>

            </Box>

            <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>
                <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'flex-start' }}>
                    <MyTextField
                        label="Title"
                        name="title"
                        control={control}
                        placeholder={"Provide a title"}
                        width={'60%'}
                    />
                </Box>
                <Box sx={{ marginBottom: '50px', display: 'flex', alignItems: 'flex-start' }}>
                    <MyMultiLineField
                        label="Description"
                        name="description"
                        control={control}
                        placeholder="Provide a description"
                        width={'60%'}
                    />
                </Box>
                <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'flex-start' }}>
                    <MyDatePickerField
                        label="Due Date"
                        name="due_date"
                        control={control}
                        width={'30%'}
                    />
                </Box>
                <Box sx={{ marginBottom: '30px', display: 'flex', alignItems: 'flex-start' }}>
                    <MySelectField
                        label="Status"
                        name="status"
                        control={control}
                        width={'30%'}
                    />
                </Box>

                <Box>
                    <Button variant="contained" type="submit" sx={{width:"100%"}}>
                        Submit
                    </Button>
                </Box>
            </Box>
            </form>
        </div>

    )
}

export default Create
