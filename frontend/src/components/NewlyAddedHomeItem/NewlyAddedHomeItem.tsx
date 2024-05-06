import React from "react";
import style from "./NewlyAddedHomeItem.module.sass";

function NewlyAddedHomeItem({
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
        alt="background_image"
        className={style.image}
      />
      <div className={style.info}>
        <div className={style.name}>{name}</div>
        <div className={style.price}>{price} zł</div>
      </div>
    </button>
  );
}

export default NewlyAddedHomeItem;
