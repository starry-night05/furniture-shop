import React, { useState, useEffect, Component } from 'react'
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
import ImageList from '@mui/material/ImageList'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
// textarea.component
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// icon.component

const NewProduct = () => {
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');

    // Mendapatkan semua data produk
    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const defaultProps = {
        options: categories,
        getOptionLabel: (option) => option.category,
    };

    // textarea properties
    return (
        <Sidebar>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: 13, md: 15 }, ml: { xs: 0, md: 2 } }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card sx={{ width: { xs: '100%', md: '100%' } }}>
                        <form>
                            <Grid container spacing={2}>
                                <Grid md={4} xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <CardContent>
                                        {/* <p style={{ background: 'red', color: '#fff', fontWeight: 'bold' }}>{msg}</p> */}
                                        <FormGroup sx={{ mb: { xs: '-1rem', md: '1.3rem' } }}>
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
                                <Grid md={4} xs={12} sx={{ display: { md: 'none', xs: 'grid' }, mb: '-2.5rem' }}>
                                    <CardContent>
                                        <FormGroup>
                                            <Typography variant="body2" color="initial" sx={{
                                                fontFamily: 'Poppins'
                                            }}>
                                                Deskripsi Produk :
                                            </Typography>
                                            <TextField type="text" name="description" id="description" placeholder='Deskripsi produk...' size='small' sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                    </CardContent>
                                </Grid>
                                <Grid md={4} xs={12}>
                                    <CardContent>
                                        <FormGroup>
                                            <Typography variant="body2" color="initial" sx={{
                                                fontFamily: 'Poppins'
                                            }}>
                                                Nama Produk :
                                            </Typography>
                                            <TextField type="text" name="product_name" id="product_name" placeholder='Nama produk...' size='small' sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2" color="initial" sx={{
                                                fontFamily: 'Poppins'
                                            }}>
                                                Kategori :
                                            </Typography>
                                            <Stack spacing={1} sx={{ width: { xs: '235px', md: '350px' } }}>
                                                <Autocomplete
                                                    {...defaultProps}
                                                    id="clear-on-escape"
                                                    clearOnEscape
                                                    renderInput={(params) => (
                                                        <TextField {...params} value={categories.id} placeholder='Pilih kategori...' variant="standard" name='categoryId' />
                                                    )}
                                                />
                                            </Stack>
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2" color="initial" sx={{
                                                fontFamily: 'Poppins'
                                            }}>
                                                Stok :
                                            </Typography>
                                            <TextField type="number" name="stock" id="stok" placeholder='Jumlah stok produk...' size='small' sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2" color="initial" sx={{
                                                fontFamily: 'Poppins'
                                            }}>
                                                Harga :
                                            </Typography>
                                            <TextField type="number" name="price" id="harga" placeholder='Rp...' size='small' sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2" color="initial" sx={{
                                                fontFamily: 'Poppins'
                                            }}>
                                                Diskon :
                                            </Typography>
                                            <TextField type="number" name="discount" id="diskon" placeholder='...%' size='small' sx={{ width: { md: '350px', xs: '235px' } }} required />
                                        </FormGroup>
                                    </CardContent>
                                </Grid>
                                <Grid md={4} xs={12} sx={{ display: { md: 'grid', xs: 'none' } }}>
                                    <CardContent>
                                        <FormGroup>
                                            <Typography variant="body2" color="initial" sx={{
                                                fontFamily: 'Poppins'
                                            }}>
                                                Deskripsi Produk :
                                            </Typography>
                                            <div className="App" style={{
                                                width: '430px'
                                            }}>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        console.log({ event, editor, data });
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        console.log('Focus.', editor);
                                                    }}
                                                />
                                            </div>
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