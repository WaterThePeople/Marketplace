import React, { useState, useEffect } from "react";
import style from "./CategoriesCard.module.sass";

const category = [
  "RPG",
  "Adventure",
  "Survival",
  "Action",
  "Strategy",
  "Platformer",
  "Fighting",
  "Sports",
  "Puzzle",
  "FPS",
  "Moba",
  "Racing",
];

const gameBudget = ["AAA", "AA", "Indie"];

const developer = [
  "From Software",
  "CD Projekt Red",
  "EA",
  "Sony",
  "Nintendo",
  "Square Enix",
  "Microsoft",
  "Ubisoft",
  "Rockstar",
  "Activision",
];

const platform = [
  "Playstation 5",
  "Playstation 4",
  "Xbox One",
  "Nintendo Switch",
  "Nintendo DS",
  "PC",
];

function CategoriesCard() {
  return (
    <div className={style.container}>
      <div className={style.category_container}>
        <div className={style.category}>Category:</div>
        {category.map((item, index) => (
          <div className={style.item} key={index}>
            <input className={style.item_checkbox} type="checkbox" />
            <div className={style.text}>{item}</div>
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
        <div className={style.category}>Developer:</div>
        {developer.map((item, index) => (
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
