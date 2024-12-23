import React, {useEffect, useState} from "react";
import AxiosInstance from "./Axios";
import {useNavigate} from "react-router-dom";
import MyTask from "./MyTask";

const Home = () =>{
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
    getTasks();
    }, [])

    const getTasks = () => {
        AxiosInstance.get("api/tasks")
            .then((res) => {setTasks(res.data); console.log(res.data)})
            .catch((err) => navigate("/login"))
    }

    const deleteTask = (id) => {
        AxiosInstance.delete(`/api/tasks/${id}/`).then((res) =>{
            if(res.status === 204) alert("MyTask deleted!")
            else alert("Failed to delete the task.")
            getTasks()
        }).catch((error) => alert(error))

    }



    return (
        <div>
            Home
            <h2>Tasks:</h2>
            {tasks.map((task) => <MyTask task={task} deleteTask={deleteTask} key={task.id}/>)}
        </div>

    )


}

export default Home
