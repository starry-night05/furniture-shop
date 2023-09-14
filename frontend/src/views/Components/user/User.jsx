import React, { useState } from 'react'
// Componen
import Navbar from '../../Layout/Navbar'
import BottomNav from '../../Layout/BottomNav'
import Footer from '../../Layout/Footer'
// swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './style/styles.css'
// material
import { Box, Card, CardContent, Container, Divider, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import CardMedia from '@mui/material/CardMedia'
// icons
import CategoryIcon from '@mui/icons-material/CategoryOutlined'
import ProductIcon from '@mui/icons-material/Inventory2Outlined'
import WishlistIcon from '@mui/icons-material/FavoriteBorderOutlined'
import WishlistIconFill from '@mui/icons-material/FavoriteOutlined'
import CartIcon from '@mui/icons-material/ShoppingCartOutlined'

const User = () => {
    const [isFilled, setIsFilled] = useState(false); // Initially, it's not filled

    const toggleIcon = () => {
        // Toggle the icon when clicked
        setIsFilled(!isFilled);
    };
    return (
        <Box component="main" sx={{ backgroundImage: `url(${process.env.PUBLIC_URL}/dashbg.svg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <Navbar />
            <Container sx={{ maxWidth: { xs: 'xl', md: 'lg' } }}>
                <Box sx={{ flexGrow: 1, p: 0, mt: { xs: 10, md: 3 }, ml: { xs: 0, md: 2 } }}>
                    {/* Banner */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: { xs: '100%' } }}>
                        <Swiper slidesPerView={1} pagination={true} modules={[Pagination, Autoplay]} autoplay={true} className="mySwiper">
                            <SwiperSlide>
                                <img src="/Newbanner.png" alt="Newbanner" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/new_banner2.png" alt="new_banner2" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/Newbanner.png" alt="Newbanner" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/new_banner2.png" alt="new_banner2" />
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                    {/* Kategori */}
                    <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: '400', mt: '2.5rem' }}><CategoryIcon />&nbsp;Kategori</Typography>
                    <Divider />
                    <Card sx={{ width: '100%', mb: '2rem', mt: '1rem', background: '#FFEA85' }}>
                        <CardContent>
                            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Grid md={2}>
                                    <Card sx={{ width: '100%' }}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <img src="/furniture.png" alt="furniture" width={55} />
                                            <Typography variant='body1'>
                                                Category 1
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    {/* Produk */}
                    <Typography variant='h5' sx={{ fontFamily: 'Poppins', fontWeight: '400', mt: '2.5rem' }}><ProductIcon />&nbsp;Produk</Typography>
                    <Divider />
                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', mt: '1rem' }}>
                        <Grid md={2}>
                            <Card sx={{ width: '100%' }}>
                                <a href='/viewProduct' style={{ textDecoration: 'none' }}>
                                    <CardMedia
                                        component="img"
                                        image="/banner.jpeg"
                                        alt="furniture"
                                    >
                                    </CardMedia>
                                    <CardContent>
                                        <Typography variant='body1' sx={{ fontFamily: 'Poppins', color: '#000' }}>Nama produk</Typography>
                                        <Typography variant='body2' sx={{ fontFamily: 'Poppins', fontWeight: 'bold', mb: '5px', color: '#000' }}>Rp.100.000</Typography>
                                        {/* Diskon dan Harga */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                            <Typography variant='body2' sx={{ fontFamily: 'Poppins', background: '#F73F52', textAlign: 'center', p: '3px', borderRadius: '20%', color: '#fff', fontWeight: '400' }}>50%</Typography>
                                            <Typography variant='body2' color="text.secondary" sx={{ fontFamily: 'Poppins', textAlign: 'center', textDecoration: 'line-through' }}>Rp.200.000</Typography>
                                        </div>
                                        {/* Wishlist dan tambah ke Cart */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', marginBottom: '-1.2rem' }}>
                                            <Typography
                                                variant='button'
                                                component='a'
                                                sx={{
                                                    textAlign: 'center',
                                                    borderRadius: '20%',
                                                    color: '#F73F52',
                                                    textDecoration: 'none',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={toggleIcon}
                                            >
                                                {isFilled ? <WishlistIconFill /> : <WishlistIcon />}
                                            </Typography>
                                            <Typography
                                                variant='button'
                                                component='a'
                                                href='/addToCart'
                                                sx={{
                                                    textAlign: 'center',
                                                    borderRadius: '20%',
                                                    color: '#7986C7',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                <CartIcon />
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </a>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
                <Footer />
            </Container>
            <BottomNav />
        </Box>
    )
}

export default User