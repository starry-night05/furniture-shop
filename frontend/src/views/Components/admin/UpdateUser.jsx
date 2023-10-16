import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
// component.render
import Sidebar from '../../Layout/Sidebar'
// mui.component
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Unstable_Grid2'
import FormGroup from '@mui/material/FormControl'
import ImageList from '@mui/material/ImageList'
import TextField from '@mui/material/TextField'

const UpdateUser = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [tlp, setTlp] = useState('');
    const [file, setFile] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById()
    }, [id]);

    const getUserById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/user/${id}`); // ngambil user id
            setCategory(response.data.category);
            setFile(response.data.url);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }


    return (
        <Container maxWidth="xs">

        </Container>
    )
}

export default UpdateUser