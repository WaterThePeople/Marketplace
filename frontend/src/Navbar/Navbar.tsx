import React from "react";
import style from "./NavBar.module.sass";
import Logo from "../components/Logo/Logo";
import { useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  let navigate = useNavigate();

  return (
    <div className={style.container}>
      <Logo />
      <div className={style.user}>
        {isLoggedIn ? (
          <div className={style.logged}>Water The People</div>
        ) : (
          <button
            className={style.not_logged}
            onClick={() => navigate("/games")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
