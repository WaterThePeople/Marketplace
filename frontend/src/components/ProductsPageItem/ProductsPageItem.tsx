import React, { useState, useEffect } from "react";
import style from "./ProductsPageItem.module.sass";
import { useNavigate } from "react-router-dom";

function ProductsPageItem({
  name,
  price,
  image,
  id,
  discount_price,
  sale,
}: {
  name: string;
  price: string;
  image: string;
  discount_price: string;
  sale: boolean;
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
        <div className={style.price_container}>
          {sale ? (
            <>
              <div className={style.price_sale_active}>{price}zł</div>
              <div className={style.price_sale}>
                {Math.floor(parseFloat(discount_price) * 100) / 100}zł
              </div>
            </>
          ) : (
            <div className={style.price}>{price}zł</div>
          )}
        </div>
      </div>
    </button>
  );
}

export default ProductsPageItem;
