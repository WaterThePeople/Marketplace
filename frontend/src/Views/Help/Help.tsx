import React from "react";
import style from "./Help.module.sass";

function Help() {
  return (
    <div className={style.container}>
      <div className={style.rules}>
        <div className={style.title}>
          Here you can find frequently asked questions:{" "}
        </div>
        <div className={style.rules_container}>
          <div className={style.rule}>
            <span className={style.question}>Question:</span>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            fringilla velit eget sapien feugiat finibus.
            <br />
            <span className={style.question}>Answer:</span>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
          <div className={style.rule}>
            <span className={style.question}>Question:</span>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            fringilla velit eget sapien feugiat finibus.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Maecenas fringilla velit eget
            sapien feugiat finibus.
            <br />
            <span className={style.question}>Answer:</span>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Maecenas fringilla
            velit eget sapien feugiat finibus.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Maecenas fringilla velit eget sapien
            feugiat finibus.Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Maecenas fringilla velit eget sapien feugiat finibus.
          </div>
          <div className={style.rule}>
            <span className={style.question}>Question:</span>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            <span className={style.question}>Answer:</span>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Maecenas fringilla
            velit eget sapien feugiat finibus.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Maecenas fringilla velit eget sapien
            feugiat finibus.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
