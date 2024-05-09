import React, { useState, useEffect } from "react";
import style from "./ProductsPageItem.module.sass";
import { useNavigate } from "react-router-dom";

function ProductsPageItem({
  name,
  price,
  image,
  id,
}: {
  name: string;
  price: string;
  image: string;
  id: number;
}) {
  const navigate = useNavigate();

  return (
    <button
      className={style.container}
      onClick={() => navigate(`/products/${id}`)}
    >
      <img
        src={process.env.PUBLIC_URL + image}
        alt="image"
        className={style.image}
      />
      <div className={style.info}>
        <div className={style.name}>{name}</div>
        <div className={style.price}>{price} zł</div>
      </div>
    </button>
  );
}

export default ProductsPageItem;
