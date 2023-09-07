import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PersonIcon from '@mui/icons-material/Person';

const BottomNav = () => {
    const [value, setValue] = React.useState(0); // Initialize the selected tab index

    // Function to handle tab change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <BottomNavigation
            sx={{ position: 'fixed', bottom: '0', left: '0', right: '0', display: { xs: 'flex', md: 'none' } }}
            value={value}
            onChange={handleChange}
            showLabels // Show labels below icons
        >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} href='/home' />
            <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
            <BottomNavigationAction label="Transaksi" icon={<ReceiptLongOutlinedIcon />} />
        </BottomNavigation>
    )
}

export default BottomNav