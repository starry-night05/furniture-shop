import React, { useState, useEffect } from 'react'
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
    const [email, setEmail] = useState('');
    const [tlp, setTlp] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState(null);
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const addUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/create-user', {
                firstname: firstname,
                lastname: lastname,
                password: password,
                file: file,
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
                    <Card sx={{ width: { xs: '100%', md: '100%' } }}>
                        <CardContent>
                            <form onSubmit={addUser}>
                                <Grid container spacing={2}>
                                    <Grid md={4} xs={12}>
                                        <FormGroup sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            {preview ? (
                                                <ImageList sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                                        <img src={preview} alt="preview" loading="lazy" style={{ width: '320px', height: '320px', marginTop: '1rem' }} />
                                                    </Box>
                                                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                                        <img src={preview} alt="preview" loading="lazy" style={{ width: '150px', height: '150px', marginTop: '1rem' }} />
                                                    </Box>
                                                </ImageList>
                                            ) : (
                                                <ImageList sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                                        <img src='../../../../public/logo192.png' alt="file" loading="lazy" style={{ width: '320px', height: '320px', marginTop: '1rem' }} />
                                                    </Box>
                                                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                                        <img src='../../../../public/logo192.png' alt="file" loading="lazy" style={{ width: '150px', height: '150px', marginTop: '1rem' }} />
                                                    </Box>
                                                </ImageList>
                                            )}
                                            <label style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                background: '#ff6b6b',
                                                color: '#f7fff7',
                                                padding: '5px',
                                                marginTop: '.5rem',
                                                width: '100%',
                                                fontFamily: 'Poppins',
                                                borderRadius: '5rem',
                                            }} for="img-product">Pilih Gambar</label>
                                            <input type="file" id='img-product' onChange={loadImage} style={{ display: 'none' }} />
                                        </FormGroup>
                                    </Grid>
                                    <Grid md={4} xs={12}>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Nama Depan :
                                            </Typography>
                                            <TextField type="text" name="firstname" id="firstname" placeholder='Nama produk...' size='small' value={firstname} onChange={(e) => setFirstname(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Kategori :
                                            </Typography>
                                            <TextField type="text" name="lastname" id="lastname" placeholder='Nama produk...' size='small' value={lastname} onChange={(e) => setLastname(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem', display: { xs: 'grid', md: 'none' } }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Email :
                                            </Typography>
                                            <TextField type="text" name="email" id="email" placeholder='Nama produk...' size='small' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        {/* sisa pw dst */}
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Stok :
                                            </Typography>
                                            <TextField type="number" name="stock" id="stok" placeholder='Jumlah stok produk...' size='small' value={stock} onChange={(e) => setStock(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Harga :
                                            </Typography>
                                            <TextField type="number" name="price" id="harga" placeholder='Rp...' size='small' value={price} onChange={(e) => setPrice(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Diskon :
                                            </Typography>
                                            <TextField type="number" name="discount" id="diskon" placeholder='...%' size='small' value={discount} onChange={(e) => setDiscount(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ display: { xs: 'grid', md: 'grid' } }}>
                                            <Button type="submit" variant='contained' sx={{
                                                fontFamily: 'Poppins',
                                                fontWeight: 'bold',
                                                color: '#f7fff7',
                                                background: '#ff6b6b',
                                                mt: '2rem',
                                                ml: 'auto',
                                                mr: { md: '3rem', xs: '5rem' },
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

export default NewUser