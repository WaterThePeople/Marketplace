import React from "react";
import style from "./OverallHomeItem.module.sass";
import { useNavigate } from "react-router-dom";

function OverallHomeItem({ data }: { data: any }) {
  const navigate = useNavigate();
  return (
    <button
      className={style.container}
      onClick={() => navigate(`/products/${data?.id}`)}
    >
      <img
        src={process.env.PUBLIC_URL + data?.image}
        alt="image"
        className={style.image}
      />
      <div className={style.info}>
        <div className={style.text}>{data?.name}</div>
        <div className={style.prices}>
          <div className={data?.sale ? style.price_sale_active : style.price}>
            {data?.price} zł
          </div>
          {data?.sale && (
            <div className={style.price_sale}>
              {Math.floor(data?.discount_price * 100) / 100} zł
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

export default OverallHomeItem;
