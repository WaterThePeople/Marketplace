import React, { useState, useEffect } from "react";
import style from "./ShoppingCartButton.module.sass";

function ShoppingCartButton() {
  return (
    <div className={style.container}>
      <button
        className={style.button}
        onClick={(e) => {
          window.location.href = "/cart";
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/cart.png"}
          alt="Cart"
          className={style.image}
        />
      </button>
    </div>
  );
}

export default ShoppingCartButton;
