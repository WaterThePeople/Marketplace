import React from "react";
import style from "./OverallHomeItem.module.sass";

function OverallHomeItem({ data, sale }: { data: any; sale?: boolean }) {
  return (
    <button className={style.container}>
      <img
        src={process.env.PUBLIC_URL + data?.image}
        alt="image"
        className={style.image}
      />
      <div className={style.info}>
        <div className={style.text}>{data?.name}</div>
        <div className={style.prices}>
          <div className={sale ? style.price_sale_active : style.price}>
            {data?.price} zł
          </div>
          {sale && (
            <div className={style.price_sale}>
              {Math.round((data?.discount_price * 100) / 100).toFixed(2)} zł
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

export default OverallHomeItem;
