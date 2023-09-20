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
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ImageList from '@mui/material/ImageList'

const UpdateCategory = () => {
    const [category, setCategory] = useState('');
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getCategoryById();
    }, [id]);

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const getCategoryById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/category/${id}`);
            setCategory(response.data.category);
            setFile(response.data.url);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    const updateCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/updateCategory/${id}`, {
                category: category,
                file: file
            }, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            navigate('/list-kategori');
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
                    <Card sx={{ width: { xs: '100%', md: '60%' } }}>
                        <CardContent>
                            <form onSubmit={updateCategory}>
                                <Grid container spacing={2}>
                                    <Grid md={6} xs={12}>
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
                                                        <img src={file} alt="file" loading="lazy" style={{ width: '320px', height: '320px', marginTop: '1rem' }} />
                                                    </Box>
                                                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                                        <img src={file} alt="file" loading="lazy" style={{ width: '150px', height: '150px', marginTop: '1rem' }} />
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
                                    <Grid md={6} xs={12}>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Kategori :
                                            </Typography>
                                            <TextField type="text" name="category" id="category" placeholder='Kategori...' size='small' value={category} onChange={(e) => setCategory(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
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
        </Sidebar >
    )
}

export default UpdateCategory