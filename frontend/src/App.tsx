import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import style from "./App.module.sass";

import Home from "./Views/Home/Home";
import ProductsPage from "./Views/ProductsPage/ProductsPage";

function App() {
  return (
    <Router>
      <div className={style.container}>
        <Navbar isLoggedIn={false} />
      </div>

      <div className={style.separator} />

      <div className={style.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
