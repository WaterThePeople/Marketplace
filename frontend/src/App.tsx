import React, { useEffect, useState } from "react";
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
import Cart from "./Views/Cart/Cart";
import UserProducts from "./Views/UserProducts/UserProducts";
import AddProduct from "./Views/AddProduct/AddProduct";
import EditProduct from "./Views/EditProduct/EditProduct";

import { checkUserAuth } from "./Authentication";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const cartItems = localStorage.getItem("cartItems");

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await checkUserAuth();
      setIsAuthenticated(authStatus);
    };
    if (!cartItems) {
      localStorage.setItem("cartItems", "[]");
    }

    checkAuth();
  }, []);

  return (
    <Router>
      <div className={style.container}>
        <Navbar isLoggedIn={isAuthenticated} />
      </div>

      <div className={style.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/questions" element={<Help />} />
          {isAuthenticated && (
            <Route path="/usergames" element={<UserProducts />} />
          )}
          {isAuthenticated && <Route path="/add" element={<AddProduct />} />}
          {isAuthenticated && (
            <Route path="/edit/:id" element={<EditProduct />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
