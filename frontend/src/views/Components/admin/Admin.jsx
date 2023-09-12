import React from 'react'
// component.render
import Sidebar from '../../Layout/Sidebar'
// mui.component
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
// icon.component
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined'
import ProductIcon from '@mui/icons-material/Inventory2Outlined'
import CategoryIcon from '@mui/icons-material/CategoryOutlined'
import TransactionIcon from '@mui/icons-material/ReceiptLongOutlined'

export const Admin = () => {
    return (
        <Sidebar>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: 13, md: 9 }, ml: { xs: 0, md: 2 } }}>
                <div style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid md={3} xs={6}>
                            <Card sx={{ background: '#F6F6F6', color: '#61677A' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <Typography variant='body2'>
                                        <PersonIcon />
                                    </Typography>
                                    <Typography variant='overline'>
                                        User
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        200
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid md={3} xs={6}>
                            <Card sx={{ background: '#F6F6F6', color: '#61677A' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <Typography variant='body2'>
                                        <ProductIcon />
                                    </Typography>
                                    <Typography variant='overline'>
                                        Produk
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        200
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid md={3} xs={6}>
                            <Card sx={{ background: '#F6F6F6', color: '#61677A' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <Typography variant='body2'>
                                        <CategoryIcon />
                                    </Typography>
                                    <Typography variant='overline'>
                                        Kategori
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        200
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid md={3} xs={6}>
                            <Card sx={{ background: '#F6F6F6', color: '#61677A' }}>
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <Typography variant='body2'>
                                        <TransactionIcon />
                                    </Typography>
                                    <Typography variant='overline'>
                                        Transaksi
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        200
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </Sidebar>
    )
}
