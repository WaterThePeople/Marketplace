import React, { useState } from "react";
import style from "./NavBar.module.sass";
import Logo from "../components/Logo/Logo";
import { useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  let navigate = useNavigate();

  const [search, setSearch] = useState("");

  return (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.logo_and_search}>
          <Logo />
          <div className={style.search_container}>
            <input
              className={style.search_input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            ></input>
            <button className={style.search_button}>SEARCH</button>
          </div>
        </div>
        <div className={style.user}>
          {isLoggedIn ? (
            <div className={style.logged}>Water The People</div>
          ) : (
            <button
              className={style.not_logged}
              //onClick={() => navigate("/games")}
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div className={style.separator}/>
      <div className={style.bottom_container}>
        <button className={style.bottom_container_button}>PRODUCTS</button>
        <button className={style.bottom_container_button}>SALES</button>
        <button className={style.bottom_container_button}>INFORMATION</button>
        <button className={style.bottom_container_button}>HELP</button>
      </div>
    </div>
  );
}

export default Navbar;
