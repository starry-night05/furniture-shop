import * as React from 'react';
// function
// material ui
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { List } from '@mui/material';
import InputBase from '@mui/material/InputBase';
// icons
import Logout from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';

function ResponsiveAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openProfile = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '25rem',
            },
        },
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="static" sx={{ background: '#F6F6F6', display: { xs: 'none', md: 'grid' }, color: '#7986C7' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/home"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Poppins',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <img src="/furniture.png" alt='furniture' width={60} style={{ marginRight: '.5rem' }}></img>
                            iCraft
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
                            <Button
                                sx={{ mr: '1rem', color: '#7986C7', display: 'block', fontFamily: 'Poppins' }}
                            >
                                Kategori
                            </Button>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Cari di Amazing..."
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 'auto' }}>
                            <IconButton
                                size='small'
                                sx={{ width: 32, height: 32, color: '#7986C7', display: 'block', fontFamily: 'Poppins', textAlign: 'center' }}
                                href='/wishlist'>
                                <FavoriteBorderOutlinedIcon />
                            </IconButton>
                            <IconButton
                                size='small'
                                sx={{ width: 32, height: 32, ml: '15px', color: '#7986C7', display: 'block', fontFamily: 'Poppins', textAlign: 'center' }}
                                href='/cart'
                            >
                                <ShoppingCartOutlinedIcon />
                            </IconButton>
                        </Box>
                        <Box>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    aria-controls={openProfile ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openProfile ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={openProfile}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    width: 150,
                                    height: { xs: 125, md: 'content' },
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    background: '#F5F5F5',
                                    '& .MuiAvatar-root': {
                                        width: 28,
                                        height: 28,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        background: '#F5F5F5',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <Typography component='a' href='/profile' sx={{ textDecoration: 'none', color: '#61677A' }}>
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> Profil
                                </MenuItem>
                            </Typography>
                            <Typography component='a' href='/transaksi' sx={{ textDecoration: 'none', color: '#61677A' }}>
                                <MenuItem onClick={handleClose}>
                                    <ReceiptOutlinedIcon />&nbsp; Transaksi
                                </MenuItem>
                            </Typography>
                            <Divider />
                            <Typography component='a' href='/logout' sx={{ textDecoration: 'none', color: '#61677A' }}>
                                <MenuItem onClick={handleClose}>
                                    <Logout />&nbsp;
                                    Logout
                                </MenuItem>
                            </Typography>
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* responsive */}
            <AppBar position='fixed' sx={{ background: '#F6F6F6', display: { xs: 'flex', md: 'none' }, color: '#7986C7' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Cari di Amazing..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{ display: 'flex', ml: 'auto' }}>
                            <List>
                                <ListItemIcon>
                                    <Typography variant="body1" component="a" href='/cart' sx={{ textDecoration: 'none', color: '#7986C7', pt: '5px', px: '5px' }}>
                                        <ShoppingCartOutlinedIcon />
                                    </Typography>
                                    <Typography variant="body1" component="a" href='/wishlist' sx={{ textDecoration: 'none', color: '#7986C7', pt: '5px', px: '5px' }}>
                                        <FavoriteBorderOutlinedIcon />
                                    </Typography>
                                </ListItemIcon>
                            </List>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
export default ResponsiveAppBar;
