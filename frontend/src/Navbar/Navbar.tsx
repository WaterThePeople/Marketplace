import React from "react";
import style from "./NavBar.module.sass";
import Logo from "../components/Logo/Logo";

function Navbar() {
  return (
    <div className={style.container}>
      <Logo />
    </div>
  );
}

export default Navbar;
