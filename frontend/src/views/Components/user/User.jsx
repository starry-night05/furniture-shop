import React from 'react'
import Navbar from '../../Layout/Navbar'
import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import BottomNav from '../../Layout/BottomNav'
import Grid from '@mui/material/Unstable_Grid2'

const User = () => {
    return (
        <Box component="main">
            <Navbar />
            <Container sx={{ maxWidth: { xs: 'xl', md: 'lg' } }}>
                <Box sx={{ flexGrow: 1, p: 0, mt: { xs: 10, md: 3 }, ml: { xs: 0, md: 2 } }}>
                    <Card sx={{ width: '100%', mb: '2rem' }}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: { xs: '15vh', md: '25vh' } }}>
                            <Typography variant='body1'>
                                Banner
                            </Typography>
                        </CardContent>
                    </Card>
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
                </Box>
            </Container>
            <BottomNav />
        </Box>
    )
}

export default User