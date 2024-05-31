import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import style from "./App.module.sass";

import Home from "./Views/Home/Home";
import ProductsPage from "./Views/ProductsPage/ProductsPage";
import Product from "./Views/Product/Product";
import SalesPage from "./Views/SalesPage/SalesPage";
import Rules from "./Views/Rules/Rules";
import Help from "./Views/Help/Help";
import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";

function App() {
  return (
    <Router>
      <div className={style.container}>
        <Navbar isLoggedIn={false} />
      </div>

      <div className={style.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/questions" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
