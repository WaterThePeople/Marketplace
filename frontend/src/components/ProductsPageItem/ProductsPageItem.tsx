import React, { useState, useEffect } from "react";
import style from "./ProductsPageItem.module.sass";

function ProductsPageItem({
  name,
  price,
  image,
}: {
  name: string;
  price: string;
  image: string;
}) {
  return (
    <button className={style.container}>
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
