import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import ProductList from "./views/ProductList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* public : *Route yang dipakai kedua role */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/list-produk" element={<ProductList />} />
          {/* user */}
          {/* admin */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
