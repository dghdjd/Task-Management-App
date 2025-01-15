import React, {useEffect, useMemo, useState} from "react";
import AxiosInstance from "./Axios";
import {useNavigate} from "react-router-dom";
import {
    MaterialReactTable
} from 'material-react-table';
import Dayjs from "dayjs";
import {Box, IconButton} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import {Link} from 'react-router-dom'

const Home = () => {
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getTasks();
    }, [])

    const getTasks = () => {
        AxiosInstance.get("api/tasks")
            .then((res) => {
                setTasks(res.data);
                console.log(res.data)
            })
            .catch((err) => navigate("/login"))
    }

    const deleteTask = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            AxiosInstance.delete(`/api/tasks/${id}/`).then((res) => {
                if (res.status === 204) alert("Task deleted!")
                else alert("Failed to delete the task.")
                getTasks()
            }).catch((error) => alert(error))
        }

    }


    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'title', //access nested data with dot notation
                header: 'Title',
                size: 150,
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 150,
            },
            {
                accessorFn: (day) => Dayjs(day.created_at).format('YYYY-MM-DD'),
                header: 'Created at',
                size: 150,
            },
            {
                accessorFn: (day) => Dayjs(day.due_date).format('YYYY-MM-DD'),
                header: 'Due date',
                size: 150,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 150,
            },
        ],
        [],
    );


    return (
        <div>
            <h2>Tasks:</h2>
            <MaterialReactTable
                columns={columns}
                data={tasks}
                enableRowActions
                renderRowActions={({row, table}) => (
                    <Box sx={{display: 'flex', flexWrap: 'nowrap', gap: '8px'}}>
                        <IconButton
                            color="secondary"
                            component={Link} to={`edit/${row.original.id}`}
                        >
                            <EditIcon/>

                        </IconButton>

                        <IconButton
                            color="error"
                            onClick={() => {
                                deleteTask(row.original.id)
                            }}

                        >
                            <DeleteIcon/>

                        </IconButton>
                    </Box>
                )}

            />
        </div>

    )


}

export default Home
