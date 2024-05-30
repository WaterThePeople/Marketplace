import React from "react";
import style from "./SliderHomeItem.module.sass";
import { useNavigate } from "react-router-dom";

function SliderHomeItem({
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
    <div
      className={style.container}
      onClick={() => navigate(`/products/${id}`)}
    >
      <img src={image} alt="background_image" className={style.image} />
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
