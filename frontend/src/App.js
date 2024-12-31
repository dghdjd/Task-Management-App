import React, {useState} from 'react';
import './App.css';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Create from './components/Create';
import Edit from './components/Edit';
// import Delete from './components/Delete';
import Login from './components/Login';
import Register from './components/Register'
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
    const [authToken, setAuthToken] = useState(null); // State to hold the token
    const drawerWidth = 220; // Drawer width for Navbar
    const navigate = useNavigate();

    function Logout() {

        localStorage.clear()
        setAuthToken(null);
        navigate("/login")
    }

    function RegisterAndLogout() {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <div className="App">
            <Routes>
                {/* Public Route for Login */}
                <Route path="/login" element={<Login setAuthToken={setAuthToken}/>}/>

                <Route path="/register" element={<Register handleLogout={RegisterAndLogout}/>}/>

                {/* Protected Routes Wrapped Inside Navbar */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <Nav
                                handleLogout={Logout}
                                content={
                                    <Routes>
                                        <Route path="" element={<Home/>}/>
                                        <Route path="/about" element={<About/>}/>
                                        <Route path="/create" element={<Create/>}/>
                                        <Route path="/edit/:id" element={<Edit/>}/>
                                    </Routes>
                                }
                            />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
