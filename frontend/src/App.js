import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import ProductList from "./views/ProductList";
import AddProduct from "./views/addProduct";
import CategoryList from "./views/CategoryList";

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
          {/* kategori */}
          <Route path="/list-kategori" element={<CategoryList />} />
          {/* user */}
          {/* admin */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
