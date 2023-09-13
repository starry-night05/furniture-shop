import React from 'react'
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
// icon.component
import AddIcon from '@mui/icons-material/Add'

// functions
const columns = [
    { id: 'img', label: 'Gambar Produk', minWidth: 170 },
    { id: 'product_name', label: 'Nama Produk', minWidth: 100 },
    { id: 'categories', label: 'Kategori', minWidth: 100 },
    { id: 'discount', label: 'Diskon (%)', minWidth: 100 },
    { id: 'Newprice', label: 'Harga (Rp.)', minWidth: 100 },
];

function createData(img, product_name, categories, discount, price) {
    const Newprice = price - price * (discount / 100);
    return { img, product_name, categories, discount, Newprice };
}
const rows = [
    createData('furniture.png', 'Meja Belajar', 'meja', 50, 2000000),
    createData('banner.jpeg', 'Meja Kerja', 'meja', 10, 4000000),
    createData('furniture.png', 'Meja Makan', 'meja', 26, 5400000),
    createData('banner.jpeg', 'Kursi Gaming', 'kursi', 5, 2300000),
    createData('furniture.png', 'Lemari Hias', 'lemari', 15, 12000000),
    createData('banner.jpeg', 'Kursi Kantor', 'kursi', 5, 800000),
];

const ProductsAdmin = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchQuery, setSearchQuery] = React.useState('');

    // Filter
    const filteredRows = rows.filter((row) => {
        const cellValue = row['product_name'].toString().toLowerCase();
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

    return (
        <Sidebar>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: 13, md: 15 }, ml: { xs: 0, md: 2 } }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="overline" component="a" href='/tambah-produk' sx={{
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
                                <AddIcon sx={{ mt: '3px' }} />&nbsp;Tambah Produk
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
                                                    minWidth: column.minWidth,
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
                                    {filteredRows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        return (
                                                            <TableCell key={column.id} align='justify' style={{ paddingLeft: '2rem' }}>
                                                                {column.id === 'img' ? (
                                                                    <img src={row.img} alt={row.product_name} style={{ maxWidth: '100px' }} />
                                                                ) : (
                                                                    row[column.id]
                                                                )}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
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

export default ProductsAdmin