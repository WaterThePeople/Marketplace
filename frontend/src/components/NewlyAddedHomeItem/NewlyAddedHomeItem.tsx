import React from "react";
import style from "./NewlyAddedHomeItem.module.sass";
import { useNavigate } from "react-router-dom";

function NewlyAddedHomeItem({
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
        alt="background_image"
        className={style.image}
      />
      <div className={style.info}>
        <div className={style.name}>{name}</div>
        {/* <div className={style.price}>{price} zł</div> */}
      </div>
    </button>
  );
}

export default NewlyAddedHomeItem;
