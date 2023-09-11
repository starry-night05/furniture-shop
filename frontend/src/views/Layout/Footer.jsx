import React from 'react'
// mui.component
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
// mui icons
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/FacebookOutlined';

const Footer = () => {
    return (
        <Box sx={{ background: '#F6F6F6', width: '100%', mt: '2rem' }}>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                <Grid md={4}>
                    <Typography variant="h6" color="text.dark" sx={{ fontFamily: 'Poppins' }}>Kategori</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit esse excepturi vero repellat quisquam iste perspiciatis consequuntur laboriosam, reprehenderit ut porro ipsa deleniti debitis omnis sed sit unde, a id veniam blanditiis mollitia est rem animi aperiam. Laudantium vel nostrum fugiat. Nisi ipsa suscipit sequi adipisci obcaecati minus, distinctio sunt!
                    </Typography>
                </Grid>
                <Grid md={4}>
                    <Typography variant="h6" color="text.dark" sx={{ fontFamily: 'Poppins' }}>Tentang iCraft</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit esse excepturi vero repellat quisquam iste perspiciatis consequuntur laboriosam, reprehenderit ut porro ipsa deleniti debitis omnis sed sit unde, a id veniam blanditiis mollitia est rem animi aperiam. Laudantium vel nostrum fugiat. Nisi ipsa suscipit sequi adipisci obcaecati minus, distinctio sunt!
                    </Typography>
                </Grid>
                <Grid md={4}>
                    <Typography variant="h6" color="text.dark" sx={{ fontFamily: 'Poppins' }}>Ikuti kami</Typography>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
                            <InstagramIcon sx={{ color: '#793FDF' }} />
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins' }}>
                            &nbsp;Instagram
                        </Typography>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
                            <TwitterIcon sx={{ color: '#7986C7' }} />
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins' }}>
                            &nbsp;Twitter
                        </Typography>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
                            <FacebookIcon sx={{ color: '#7091F5' }} />
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins' }}>
                            &nbsp;Facebook
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="overline" color="text.dark" sx={{ fontFamily: 'Poppins', fontWeight: '400' }}>&copy; 2023 - Bryant</Typography>
            </div>
        </Box>
    )
}

export default Footer