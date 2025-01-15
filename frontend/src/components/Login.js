import React, {useState} from 'react';
import AxiosInstance from './Axios';
import {data, Link, useNavigate} from "react-router-dom";
import './styles/style.css'
import MyTextField from "./forms/MyTextField";
import {useForm} from "react-hook-form";
import {Alert, Box, Button} from "@mui/material";
import {blueGrey, grey, red} from "@mui/material/colors";
import {dark} from "@mui/material/styles/createPalette";
import Typography from "@mui/material/Typography";


const Login = ({setAuthToken}) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [errorVisibility, setErrorVisibility] = useState(false)
    const defaultValues = {
        username: '',
        password: '',
    }
    const {handleSubmit, control} = useForm({defaultValues})

    const submission = (data) => {
        AxiosInstance.post('api/token/', {
            username: data.username,
            password: data.password
        })
            .then((response) => {
                const accessToken = response.data.access;
                const refreshToken = response.data.refresh;
                localStorage.setItem('accessToken', accessToken); // Store in sessionStorage
                localStorage.setItem('refreshToken', refreshToken);
                setAuthToken(accessToken);
                console.log('Login successful!');
                navigate('/');
            })
            .catch((error) => {
                console.error('Login failed:', error.response?.data || error.message);
                setErrorMessage('Invalid username or password')
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
                <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', mb: 3, textAlign: 'center'}}>
                        Task Management App
                    </Typography>

                <form onSubmit={handleSubmit(submission)}>

                    <Typography variant="h4" component="h1" sx={{fontWeight: 'bold', mb: 3, textAlign: 'center'}}>
                        Login
                    </Typography>


                    {errorMessage && (<Alert severity="error" sx={{marginBottom: 2}}>
                        {errorMessage}
                    </Alert>)}


                    <Box sx={{marginBottom: '10px', display: 'flex', alignItems: 'center'}}>
                        <MyTextField
                            label="Username"
                            name="username"
                            control={control}
                            placeholder={"Enter your username"}
                            width={'100%'}
                        />
                    </Box>
                    <Box sx={{marginBottom: '30px', display: 'flex', alignItems: 'center'}}>
                        <MyTextField
                            label="Password"
                            name="password"
                            type="password"
                            control={control}
                            placeholder={"Enter your password"}
                            width={'100%'}
                        />
                    </Box>

                    <Button type="submit" variant='contained' color='primary' sx={{
                        marginBottom: '30px',
                        alignItems: 'center'
                    }}>
                        Login
                    </Button>

                    <Typography>
                        Don’t have an account yet?{' '}
                    </Typography>

                    <Link to="/register" className="register-link">
                        Register
                    </Link>

                </form>
            </Box>

        </Box>
    );
};

export default Login;
