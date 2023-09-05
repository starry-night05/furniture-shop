import React from 'react'
import Navbar from '../../Layout/Navbar'
import { Box, Typography } from '@mui/material'
import BottomNav from '../../Layout/BottomNav'

const User = () => {
    return (
        <Box component="main">
            <Navbar />
            <Box sx={{ flexGrow: 1, p: 3, mt: { xs: 8, md: 2 }, ml: { xs: 0, md: 2 } }}>
                <Typography variant='h5' sx={{ fontFamily: 'Lato', mb: '1.5rem' }}>
                    Welcome...
                </Typography>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam doloremque autem beatae expedita est ad tempore aperiam inventore hic velit quo, cumque, non quibusdam aliquam debitis omnis fuga iusto corrupti dignissimos? Autem voluptas ex, odio natus magni eum iure, repellendus labore eveniet amet ipsa cum sapiente pariatur illum eligendi magnam impedit ducimus.
                </Typography>
                <BottomNav />
            </Box>
        </Box>
    )
}

export default User