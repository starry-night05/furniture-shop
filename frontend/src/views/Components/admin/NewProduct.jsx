import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

// icon.component

const NewProduct = () => {
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }
    return (
        <Sidebar>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: 13, md: 15 }, ml: { xs: 0, md: 2 } }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card sx={{ width: { xs: '100%', md: '60%' } }}>
                        <form>
                            <Grid container spacing={2}>
                                <Grid md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CardContent>
                                        {/* <p style={{ background: 'red', color: '#fff', fontWeight: 'bold' }}>{msg}</p> */}
                                        <FormGroup sx={{ mb: '1.3rem' }}>
                                            {preview ? (
                                                <img src={preview} alt="preview" style={{ width: '320px', height: '320px', marginTop: '1rem' }} />
                                            ) : (
                                                <Typography sx={{
                                                    fontFamily: 'Poppins',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    border: '2px solid #000',
                                                    marginTop: '1rem',
                                                    padding: '5px',
                                                    borderRadius: '2%',
                                                    width: { xs: '150px', md: '320px' },
                                                    height: { xs: '150px', md: '320px' },
                                                }}>Preview Image</Typography>
                                            )}
                                            <label style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                background: 'red',
                                                color: '#fff',
                                                padding: '5px',
                                                marginTop: '.5rem',
                                                width: '100%',
                                                fontFamily: 'Poppins',
                                                borderRadius: '5rem',
                                            }} for="img-product">Pilih Gambar</label>
                                            <input type="file" id='img-product' onChange={loadImage} style={{ display: 'none' }} />
                                        </FormGroup>
                                    </CardContent>
                                </Grid>
                                <Grid md={6} xs={12}>
                                    <CardContent>
                                        <FormGroup>
                                            <Typography variant="body2" color="initial">Nama Produk</Typography>
                                            <input type="text" name="product_name" id="product_name" placeholder='Nama produk...' style={{ width: '235px', padding: '5px' }} />
                                        </FormGroup>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </div>
            </Box>
        </Sidebar>
    )
}

export default NewProduct