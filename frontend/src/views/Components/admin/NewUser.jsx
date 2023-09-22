import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import { Button } from '@mui/material'

const NewUser = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setconfPassword] = useState('');
    const [email, setEmail] = useState('');
    const [tlp, setTlp] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const defaultProps = {
        options: status,
        getOptionLabel: (option) => option.roles,
    };
    const [role, setRole] = useState(null);

    const addUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/create-user', {
                firstname: firstname,
                lastname: lastname,
                password: password,
                confPassword: confPassword,
                file: '/profile.png',
                email: email,
                tlp: tlp,
                role: role
            }, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            navigate('/list-user');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    return (
        <Sidebar>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: 13, md: 15 }, ml: { xs: 0, md: 2 } }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card sx={{ width: { xs: '100%', md: '70%' } }}>
                        <CardContent>
                            <form onSubmit={addUser}>
                                <Grid container spacing={5}>
                                    <Grid md={6} xs={12}>
                                        <FormGroup sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <ImageList sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                                    <img src='/profile.png' alt="profile" loading="lazy" style={{ width: '250px', height: '250px', marginTop: '1rem' }} />
                                                </Box>
                                                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                                    <img src='/profile.png' alt="profile" loading="lazy" style={{ width: '150px', height: '150px', marginTop: '1rem' }} />
                                                </Box>
                                            </ImageList>
                                        </FormGroup>
                                    </Grid>
                                    <Grid md={6} xs={12}>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Nama Depan :
                                            </Typography>
                                            <TextField type="text" name="firstname" id="firstname" placeholder='Nama depan' size='small' value={firstname} onChange={(e) => setFirstname(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Nama Belakang :
                                            </Typography>
                                            <TextField type="text" name="lastname" id="lastname" placeholder='Nama belakang' size='small' value={lastname} onChange={(e) => setLastname(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Email :
                                            </Typography>
                                            <TextField type="text" name="email" id="email" placeholder='Email' size='small' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Password :
                                            </Typography>
                                            <TextField type="password" name="password" id="password" placeholder='Password' size='small' value={password} onChange={(e) => setPassword(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Konfirmasi password :
                                            </Typography>
                                            <TextField type="password" name="confPassword" id="confPassword" placeholder='Konfirmasi password' size='small' value={confPassword} onChange={(e) => setconfPassword(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                No. tlp :
                                            </Typography>
                                            <TextField type="number" name="tlp" id="tlp" placeholder='08xxxxxxxx' size='small' value={tlp} onChange={(e) => setTlp(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Role :
                                            </Typography>
                                            <TextField type="text" name="role" id="role" placeholder='08xxxxxxxx' size='small' value={role} onChange={(e) => setRole(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                            {/* <Stack spacing={1} sx={{ width: { xs: '235px', md: '350px' } }}>
                                                <Autocomplete
                                                    {...defaultProps}
                                                    id="clear-on-escape"
                                                    clearOnEscape
                                                    value={role}
                                                    onChange={(event, newValue) => setRole(newValue)}
                                                    renderInput={(params) => (
                                                        <TextField {...params} placeholder='Pilih role' variant="standard" />
                                                    )}
                                                />
                                            </Stack> */}
                                        </FormGroup>
                                        <FormGroup sx={{ display: { xs: 'grid', md: 'grid' } }}>
                                            <Button type="submit" variant='contained' sx={{
                                                fontFamily: 'Poppins',
                                                fontWeight: 'bold',
                                                color: '#f7fff7',
                                                background: '#ff6b6b',
                                                mt: '2rem',
                                                ml: 'auto',
                                                mr: { md: '6rem', xs: '5rem' },
                                                '&:hover': {
                                                    background: '#f7fff7',
                                                    color: '#ff6b6b',
                                                    border: '1px solid #ff6b6b'
                                                }
                                            }}>
                                                Tambah
                                            </Button>
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </Box>
        </Sidebar>
    )
}

const status = [
    { roles: 'admin' },
    { roles: 'user' },
];

export default NewUser