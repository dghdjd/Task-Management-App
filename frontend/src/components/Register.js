import React, {useState} from 'react';
import AxiosInstance from './Axios';
import './styles/style.css'
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import MyTextField from "./forms/MyTextField";
import {useForm} from "react-hook-form";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Register = ({handleLogout}) => {
    const navigate = useNavigate()
    const [backendErrors, setBackendErrors] = useState({});
    const defaultValues = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: ''
    };

    const {handleSubmit, control} = useForm({defaultValues})


    const submission = (data) => {
        AxiosInstance.post('api/register/', {
            username: data.username,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            password: data.password,
            password2: data.confirm_password
        })
            .then((response) => {
                console.log('User registered successfully:', response.data);
                alert('User registered successfully:')
                navigate("/login")
            })
            .catch((error) => {
                console.error('Registration failed:', error.response.data);
                if (error.response?.data) {
                    setBackendErrors(error.response.data);
                }
            });
    };

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
            <Box sx={{
                display: 'flex',
                width: '30%',
                boxShadow: 10,
                padding: 4,
                flexDirection: 'column',
                borderRadius: 4
            }}>
                <Button  variant='contained' color='primary' onClick={handleLogout} startIcon={<ArrowBackIcon />} sx={{
                        marginBottom: '30px',
                        width:'20%',
                        alignItems: 'left'
                    }}>
                        Back
                </Button>
                <form onSubmit={handleSubmit(submission)}>
                    <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', mb: 3, textAlign: 'center'}}>
                        Register
                    </Typography>
                    <Link to="/Login" className="register-link">Go Back</Link>

                    <Box sx={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                        <MyTextField
                            label="Username"
                            name="username"
                            control={control}
                            placeholder={"Enter your username"}
                            width={'100%'}
                            externalError={backendErrors.username}
                        />
                    </Box>
                    <Box sx={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                        <MyTextField
                            label="Email"
                            name="email"
                            control={control}
                            placeholder={"Enter your email"}
                            width={'100%'}
                            externalError={backendErrors.email}
                        />
                    </Box>
                    <Box sx={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                        <MyTextField
                            label="First Name"
                            name="first_name"
                            control={control}
                            placeholder={"Enter your first name"}
                            width={'100%'}
                            externalError={backendErrors.first_name}
                        />
                    </Box>
                    <Box sx={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                        <MyTextField
                            label="Last Name"
                            name="last_name"
                            control={control}
                            placeholder={"Enter your last name"}
                            width={'100%'}
                            externalError={backendErrors.last_name}
                        />
                    </Box>
                    <Box sx={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                        <MyTextField
                            label="Password"
                            name="password"
                            control={control}
                            placeholder={"Enter your password"}
                            type={"password"}
                            width={'100%'}
                            externalError={backendErrors.password}
                        />
                    </Box>
                    <Box sx={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                        <MyTextField
                            label="Confirm password"
                            name="confirm_password"
                            control={control}
                            placeholder={"Confirm your password"}
                            type={"password"}
                            width={'100%'}
                            externalError={backendErrors.non_field_errors}
                        />
                    </Box>
                    <Button type="submit" variant='contained' color='primary' sx={{
                        marginBottom: '30px',
                        alignItems: 'center'
                    }}>
                        Register
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default Register;
