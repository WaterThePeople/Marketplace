import React from "react";
import style from "./SliderHomeItem.module.sass";

function SliderHomeItem({
  name,
  price,
  image,
}: {
  name: string;
  price: string;
  image: string;
}) {
  return (
    <div className={style.container}>
      <img
        src={process.env.PUBLIC_URL + image}
        alt="background_image"
        className={style.image}
      />
      <div className={style.info}>
        <div className={style.text}>{name}</div>
        <button className={style.buy}>
          <div>BUY NOW</div>
          <div>{price} zł</div>
        </button>
      </div>
    </div>
  );
}

export default SliderHomeItem;
