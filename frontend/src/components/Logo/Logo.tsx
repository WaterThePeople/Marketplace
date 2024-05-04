import React, { useState, useEffect } from "react";
import style from "./Logo.module.sass";

function Logo() {
  return (
    <div className={style.container}>
      <button
        className={style.button}
        onClick={(e) => {
          window.location.href = "/";
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/logo_transparent_blue.png"}
          alt="Logo"
          className={style.image}
        />
        <div className={style.text}>SOMEegro</div>
      </button>
    </div>
  );
}

export default Logo;
