import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import FormGroup from '@mui/material/FormControl';
import ImageList from '@mui/material/ImageList';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const UpdateProduct = () => {
    const [product_name, setProductName] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(null); // Store category ID
    const [categories, setCategories] = useState([]); // Store categories
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch categories when the component mounts
        getCategories();
    }, []);

    useEffect(() => {
        // Fetch product data when the component mounts
        getProductById();
    }, [id]); // Trigger the update when the 'id' parameter changes

    const getCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/categories');
            setCategories(response.data); // Store categories in state
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
        options: categories, // Use the categories from state
        getOptionLabel: (option) => option.category,
    };

    const getProductById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/product/${id}`);
            setProductName(response.data.product_name);
            setCategoryId(response.data.categoryId);
            setStock(response.data.stock);
            setPrice(response.data.price);
            setDiscount(response.data.discount);
            setDescription(response.data.description);
            setFile(response.data.url);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/updateProduct/${id}`, {
                categoryId: categoryId, // Use the selected category ID
                product_name: product_name,
                description: description,
                stock: stock,
                file: file,
                price: price,
                discount: discount
            }, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            navigate('/list-produk');
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
                            <form onSubmit={updateProduct}>
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
                                    <Grid md={4} xs={12}>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Nama Produk :
                                            </Typography>
                                            <TextField type="text" name="product_name" id="product_name" placeholder='Nama produk...' size='small' value={product_name} onChange={(e) => setProductName(e.target.value)} sx={{ width: { md: '350px', xs: '235px' } }} required />
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
                                            <Stack spacing={1} sx={{ width: { xs: '235px', md: '350px' } }}>
                                                <Autocomplete
                                                    {...defaultProps}
                                                    id="clear-on-escape"
                                                    clearOnEscape
                                                    value={categories.find(cat => cat.id === categoryId)} // Set the initial value based on categoryId
                                                    onChange={(event, newValue) => {
                                                        if (newValue) {
                                                            setCategoryId(newValue.id); // Update categoryId when a new category is selected
                                                        } else {
                                                            setCategoryId(null); // Clear categoryId when no category is selected
                                                        }
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField {...params} placeholder='Pilih kategori...' variant="standard" name='categoryId' />
                                                    )}
                                                />
                                            </Stack>
                                        </FormGroup>
                                        <FormGroup sx={{ mt: '1rem', display: { xs: 'grid', md: 'none' } }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Deskripsi Produk :
                                            </Typography>
                                            <Box className="App" sx={{
                                                width: '235px'
                                            }}>
                                                <CKEditor
                                                    data={description}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setDescription(data);
                                                    }}
                                                    editor={ClassicEditor}
                                                    onBlur={(event, editor) => {
                                                        console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        console.log('Focus.', editor);
                                                    }}
                                                />
                                            </Box>
                                        </FormGroup>
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
                                        <FormGroup sx={{ display: { xs: 'grid', md: 'none' } }}>
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
                                                Edit
                                            </Button>
                                        </FormGroup>
                                    </Grid>
                                    <Grid md={4} xs={12} sx={{ display: { xs: 'none', md: 'grid' } }}>
                                        <FormGroup sx={{ mt: '1rem' }}>
                                            <Typography variant="body2"
                                                sx={{
                                                    fontFamily: 'Poppins',
                                                    fontWeight: '400'
                                                }}
                                            >
                                                Deskripsi Produk :
                                            </Typography>
                                            <Box className="App" sx={{
                                                width: '430px'
                                            }}>
                                                <CKEditor
                                                    data={description}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setDescription(data);
                                                    }}
                                                    editor={ClassicEditor}
                                                    onBlur={(event, editor) => {
                                                        console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        console.log('Focus.', editor);
                                                    }}
                                                />
                                            </Box>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button type="submit" variant='contained' sx={{
                                                fontFamily: 'Poppins',
                                                fontWeight: 'bold',
                                                color: '#f7fff7',
                                                background: '#ff6b6b',
                                                mt: '.5rem',
                                                ml: 'auto',
                                                mr: { md: '1rem', xs: '4rem' },
                                                '&:hover': {
                                                    background: '#f7fff7',
                                                    color: '#ff6b6b',
                                                    border: '1px solid #ff6b6b'
                                                }
                                            }}>
                                                Edit
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

export default UpdateProduct