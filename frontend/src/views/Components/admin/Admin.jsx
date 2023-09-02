import React from 'react'
import Sidebar from '../../Layout/Sidebar'
import { Box, Typography } from '@mui/material'
export const Admin = () => {
    return (
        <Sidebar>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: 15, md: 9 }, ml: { xs: 0, md: 2 } }}>
                <Typography variant='h5' sx={{ fontFamily: 'Lato', mb: '1.5rem' }}>
                    Welcome...
                </Typography>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam doloremque autem beatae expedita est ad tempore aperiam inventore hic velit quo, cumque, non quibusdam aliquam debitis omnis fuga iusto corrupti dignissimos? Autem voluptas ex, odio natus magni eum iure, repellendus labore eveniet amet ipsa cum sapiente pariatur illum eligendi magnam impedit ducimus. Rem deserunt sunt aliquam facilis repellat ex cupiditate reprehenderit numquam recusandae mollitia esse porro dolorem a nihil ab tempore, nesciunt veritatis dolor doloribus. Dolorem, nihil libero pariatur rerum magnam autem obcaecati voluptates iusto itaque, deleniti eum magni totam est minima et sed! Praesentium quaerat ab modi at, temporibus obcaecati libero omnis corporis repellendus natus eveniet, quasi nobis aliquid recusandae aliquam veniam doloribus enim amet sint necessitatibus totam. Quibusdam, culpa ut maiores rem vitae consectetur repudiandae non officia hic! Itaque placeat recusandae quo. Doloremque voluptates natus aspernatur culpa voluptas ipsa blanditiis similique eligendi tempore neque, itaque eius quaerat animi laboriosam inventore at porro ipsum quisquam alias nemo. Consequuntur totam perspiciatis suscipit soluta. Laboriosam, non. Nostrum repellat libero, explicabo magnam, accusantium esse blanditiis, velit eos deleniti vel repudiandae tenetur quas necessitatibus. Eveniet placeat, vitae in mollitia impedit minus ut similique quidem quia dignissimos obcaecati labore magnam cumque porro necessitatibus fuga?
                </Typography>
            </Box>
        </Sidebar>
    )
}
