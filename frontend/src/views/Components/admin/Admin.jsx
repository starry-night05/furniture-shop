import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        countProducts();
    }, []);

    useEffect(() => {
        countCategories();
    }, []);

    useEffect(() => {
        countUsers();
    }, []);

    const countProducts = async () => {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
    }

    const countCategories = async () => {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
    }

    const countUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
    }

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
                                        {users.length}
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
                                        {products.length}
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
                                        {categories.length}
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
                <div style={{ width: '100%', marginTop: '3rem' }}>
                    <Grid container spacing={2}>
                        <Grid md={12} xs={12}>
                            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#F6F6F6', color: '#61677A', height: { xs: '30vh', md: '60vh', boxShadow: '2px 2px 4px 2px rgba(0, 0, 0, 0.2)' } }}>
                                <CardContent>
                                    <Typography variant='overline'>
                                        Chart
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
