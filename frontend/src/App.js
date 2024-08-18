import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import ProductList from "./views/ProductList";
import AddProduct from "./views/addProduct";
import CategoryList from "./views/CategoryList";
import AddCategories from "./views/AddCategories";
import EditProduct from "./views/EditProduct";
import EditCategory from "./views/EditCategory";
import ListUsers from "./views/ListUsers";
import AddUser from "./views/AddUser";
import Register from "./views/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* public : *Route yang dipakai kedua role */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          {/* Produk */}
          <Route path="/list-produk" element={<ProductList />} />
          <Route path="/tambah-produk" element={<AddProduct />} />
          <Route path="/edit-produk/:id" element={<EditProduct />} />
          {/* kategori */}
          <Route path="/list-kategori" element={<CategoryList />} />
          <Route path="/tambah-kategori" element={<AddCategories />} />
          <Route path="/edit-kategori/:id" element={<EditCategory />} />
          {/* user */}
          <Route path="/list-user" element={<ListUsers />} />
          <Route path="/tambah-user" element={<AddUser />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
