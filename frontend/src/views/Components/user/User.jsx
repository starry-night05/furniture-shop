import React from 'react'
// Componen
import Navbar from '../../Layout/Navbar'
// material ui
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import BottomNav from '../../Layout/BottomNav'
import Grid from '@mui/material/Unstable_Grid2'
// icons

const User = () => {
    return (
        <Box component="main" sx={{ backgroundImage: `url(${process.env.PUBLIC_URL}/dashbg.svg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <Navbar />
            <Container sx={{ maxWidth: { xs: 'xl', md: 'lg' } }}>
                <Box sx={{ flexGrow: 1, p: 0, mt: { xs: 10, md: 3 }, ml: { xs: 0, md: 2 } }}>
                    {/* Banner */}
                    <Card sx={{ width: '100%', mb: '2rem' }}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: { xs: '15vh', md: '25vh' } }}>
                            <Carousel autoPlay={true}>
                                <div>
                                    <img src="furniture.png" alt="furniture" />
                                </div>
                                <div>
                                    <img src="furniture.png" alt="furniture" />
                                </div>
                                <div>
                                    <img src="furniture.png" alt="furniture" />
                                </div>
                            </Carousel>
                        </CardContent>
                    </Card>
                    {/* Kategori */}
                    <Card sx={{ width: '100%', mb: '2rem' }}>
                        <CardContent>
                            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Grid md={2}>
                                    <Card sx={{ width: '100%' }}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Typography variant='body1'>
                                                Category 1
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid md={2}>
                                    <Card sx={{ width: '100%' }}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Typography variant='body1'>
                                                Category 2
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid md={2}>
                                    <Card sx={{ width: '100%' }}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Typography variant='body1'>
                                                Category 3
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid md={2}>
                                    <Card sx={{ width: '100%' }}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Typography variant='body1'>
                                                Category 4
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid md={2}>
                                    <Card sx={{ width: '100%' }}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Typography variant='body1'>
                                                Category 5
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid md={2}>
                                    <Card sx={{ width: '100%' }}>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Typography variant='body1'>
                                                Category 6
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    {/* Produk */}
                </Box>
            </Container>
            <BottomNav />
        </Box>
    )
}

export default User