import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// component.render
import Sidebar from '../../Layout/Sidebar'
// mui.component
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// icon.component
import AddIcon from '@mui/icons-material/Add'

const columns = [
    { id: 'no', label: 'No.', minWidth: 170 },
    { id: 'name', label: 'Nama', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'tlp', label: 'No tlp', minWidth: 100 },
    { id: 'address', label: 'Alamat', minWidth: 100 },
    { id: 'role', label: 'Role', minWidth: 100 },
    { id: 'aksi', label: 'Edit/Hapus', minWidth: 100 },
];

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Filter
    const filteredRows = users.filter((users) => {
        const cellValue = users['firstname'].toString().toLowerCase();
        return cellValue.includes(searchQuery.toLowerCase());
    });

    // Pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Mendapatkan semua data produk
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
    }

    const editUser = async (userId) => {
        await axios.get(`http://localhost:5000/user/${userId}`);
        navigate(`/edit-user/${userId}`);
    }

    const removeUser = async (usersId) => {
        await axios.delete(`http://localhost:5000/removeUser/${usersId}`);
        getUsers();
    }
    return (
        <Sidebar>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: 13, md: 15 }, ml: { xs: 0, md: 2 } }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="overline" component="a" href='/tambah-user' sx={{
                                fontFamily: 'Poppins',
                                textDecoration: 'none',
                                color: '#FFC436',
                                background: '#122D42',
                                padding: '8px',
                                margin: '10px',
                                mr: 'auto',
                                borderRadius: '5px',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                <AddIcon sx={{ mt: '3px' }} />&nbsp;Tambah User
                            </Typography>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    margin: '10px',
                                    width: '50%',
                                    padding: '8px',
                                    border: '1px solid #000',
                                    borderRadius: '5px',
                                    marginRight: 'auto'
                                }}
                            />
                        </div>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align='justify'
                                                style={{
                                                    background: '#122D42',
                                                    color: '#fff',
                                                    fontFamily: 'Poppins',
                                                    fontWeight: 400
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredRows.map((users, index) => {
                                        return (
                                            <TableRow hover role="checkbox" key={users.id}>
                                                <TableCell key={users.id} style={{ paddingLeft: '2rem' }}>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell key={users.id} style={{ paddingLeft: '2rem' }}>
                                                    {users.firstname + ' ' + users.lastname}
                                                </TableCell>
                                                <TableCell key={users.id} style={{ paddingLeft: '2rem' }}>
                                                    {users.email}
                                                </TableCell>
                                                <TableCell key={users.id} style={{ paddingLeft: '2rem' }}>
                                                    {users.tlp}
                                                </TableCell>
                                                <TableCell key={users.id} style={{ paddingLeft: '2rem' }}>
                                                    {users.address == null ? '---' : users.address}
                                                </TableCell>
                                                <TableCell key={users.id} style={{ paddingLeft: '2rem' }}>
                                                    {users.role}
                                                </TableCell>
                                                <TableCell key={users.id} style={{ paddingLeft: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '15vh' }}>
                                                    <Button type='submit' variant='contained' onClick={() => editUser(users.id)} sx={{
                                                        fontFamily: 'Poppins',
                                                        background: '#7986C7',
                                                        color: '#fff',
                                                        "&:hover": {
                                                            background: '#fff',
                                                            color: '#7986C7'
                                                        }
                                                    }}>
                                                        Edit
                                                    </Button>
                                                    <Button type='submit' variant='contained' onClick={() => removeUser(users.id)} sx={{
                                                        fontFamily: 'Poppins',
                                                        background: '#F73F52',
                                                        color: '#fff',
                                                        "&:hover": {
                                                            background: '#fff',
                                                            color: '#F73F52'
                                                        }
                                                    }}>
                                                        Hapus
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[20, 40, 100]}
                            component="div"
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </Box>
        </Sidebar>
    )
}

export default UserList