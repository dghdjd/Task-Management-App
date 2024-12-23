import React from "react"
import {Button} from "@mui/material";


const MyTask = ({task, deleteTask}) => {
    const formattedDate = new Date(task.created_at).toLocaleDateString("en-US")
    const formattedDueDate = new Date(task.due_date).toLocaleDateString("en-US")

    return (
        <div>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
            <p>Created at: {formattedDate}</p>
            <p>Due date: {formattedDueDate}</p>
            <p>Completed? : {task.completed ? "Yes" : "No"}</p>
            <Button variant="contained" color="error" onClick={() => deleteTask(task.id)}>Delete</Button>
        </div>
    )
}

export default MyTask;