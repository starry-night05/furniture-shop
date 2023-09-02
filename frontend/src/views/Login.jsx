import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Login, reset } from "../features/authSlice";
import { Avatar, Box, Container, FormGroup, TextField } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'
import Person from '@mui/icons-material/Person';

const Login = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (user || isSuccess) {
    //         navigate("/");
    //     }
    //     dispatch(reset());
    // }, [user, isSuccess, dispatch, navigate]);

    // const Auth = (e) => {
    //     e.preventDefault();
    //     dispatch(Login({ email, password }));
    // }

    return (
        <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Card sx={{ width: 980 }}>
                    <Box flexGrow={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Grid md={6} sx={{ p: 3 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" sx={{ textAlign: 'center', mb: '2rem' }}>
                                        Login
                                    </Typography>
                                    <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Avatar sx={{ width: 100, height: 100 }}>
                                            <Person sx={{ width: 90, height: 90 }} />
                                        </Avatar>
                                    </Typography>
                                </CardContent>
                                <CardContent sx={{ mt: '2rem' }}>
                                    <form>
                                        <FormGroup sx={{ mb: '1rem' }}>
                                            <Typography variant="body1">Email :</Typography>
                                            <TextField id="outlined-basic" variant="outlined" type='text' size='small' />
                                        </FormGroup>
                                        <FormGroup sx={{ mb: '1rem' }}>
                                            <Typography variant="body1">Password :</Typography>
                                            <TextField id="outlined-basic" variant="outlined" type='password' size='small' />
                                        </FormGroup>
                                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <FormGroup>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Button type='submit' variant='contained' sx={{
                                                        background: 'green',
                                                        color: '#fff',
                                                        fontWeight: 'bold',
                                                        width: '100px'
                                                    }}>Login</Button>
                                                </div>
                                            </FormGroup>
                                        </CardActions>
                                    </form>
                                </CardContent>
                            </Grid>
                            <Grid md={6}>
                                <CardContent sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                                    <Typography gutterBottom variant="h5" sx={{ mt: '8rem' }}>
                                        Furniture Shop
                                    </Typography>
                                    <Typography variant="body1">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque ipsa ab minus itaque quo illo dignissimos deserunt rem quia assumenda asperiores impedit corporis architecto voluptates eligendi, hic laudantium veritatis alias minima id doloremque cum error. Rerum voluptate quibusdam, nam, ex placeat vitae repellendus, aspernatur vel nisi modi reprehenderit quasi suscipit!
                                    </Typography>
                                    <Typography variant="body2" sx={{ mb: '5rem', mt: '1rem' }}>
                                        Belum punya akun?&nbsp;
                                        <a href="/register" style={{ textDecoration: 'none', color: '#000' }}>Daftar Gratis disini!</a>
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Box>
                    <CardContent sx={{ display: { xs: 'grid', md: 'none' } }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" sx={{ textAlign: 'center', mb: '2rem' }}>
                                Login
                            </Typography>
                            <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Avatar sx={{ width: 100, height: 100 }}>
                                    <Person sx={{ width: 90, height: 90 }} />
                                </Avatar>
                            </Typography>
                        </CardContent>
                        <CardContent sx={{ mt: '2rem' }}>
                            <form>
                                <FormGroup sx={{ mb: '1rem' }}>
                                    <Typography variant="body1">Email :</Typography>
                                    <TextField id="outlined-basic" variant="outlined" type='text' size='small' />
                                </FormGroup>
                                <FormGroup sx={{ mb: '1rem' }}>
                                    <Typography variant="body1">Password :</Typography>
                                    <TextField id="outlined-basic" variant="outlined" type='password' size='small' />
                                </FormGroup>
                                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <FormGroup>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Button type='submit' variant='contained' sx={{
                                                background: 'green',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                width: '100px'
                                            }}>Login</Button>
                                        </div>
                                    </FormGroup>
                                </CardActions>
                            </form>
                        </CardContent>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default Login