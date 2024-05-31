import React, { useState, useEffect } from "react";
import style from "./CategoriesCard.module.sass";

function CategoriesCard({
  category,
  gameBudget,
  platform,
}: {
  category: any[];
  gameBudget: any[];
  platform: any[];
}) {
  return (
    <div className={style.container}>
      <div className={style.category_container}>
        <div className={style.category}>Category:</div>
        {category.map((item, index) => (
          <div className={style.item} key={index}>
            <input className={style.item_checkbox} type="checkbox" />
            <div className={style.text}>{item?.category_name}</div>
          </div>
        ))}
      </div>
      <div className={style.category_container}>
        <div className={style.category}>Budget:</div>
        {gameBudget.map((item, index) => (
          <div className={style.item} key={index}>
            <input className={style.item_checkbox} type="checkbox" />
            <div className={style.text}>{item}</div>
          </div>
        ))}
      </div>
      <div className={style.category_container}>
        <div className={style.category}>Platform:</div>
        {platform.map((item, index) => (
          <div className={style.item} key={index}>
            <input className={style.item_checkbox} type="checkbox" />
            <div className={style.text}>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesCard;
