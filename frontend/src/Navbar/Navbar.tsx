import React, { useState, useEffect } from "react";
import style from "./NavBar.module.sass";
import Logo from "../components/Logo/Logo";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../utils/useWindowDimensions";

function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  let navigate = useNavigate();

  const [search, setSearch] = useState("");

  const path = window.location.pathname;

  const { height, width } = useWindowDimensions();

  return (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.logo_and_search}>
          <Logo />
          {/* <div className={style.search_container}>
            <input
              className={style.search_input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
            <button className={style.search_button}>SEARCH</button>
          </div> */}
        </div>
        <div className={style.user}>
          {isLoggedIn ? (
            <div className={style.logged}>Water The People</div>
          ) : (
            <button className={style.not_logged}>Login</button>
          )}
        </div>
      </div>
      <div className={style.separator} />
      <div className={style.bottom_container}>
        <button
          className={style.bottom_container_button}
          onClick={() => navigate("/products")}
        >
          <div
            className={
              path === "/products" ? style.path_button_focus : style.path_button
            }
          >
            PRODUCTS
          </div>
        </button>
        <button
          className={style.bottom_container_button}
          onClick={() => navigate("/sales")}
        >
          <div
            className={
              path === "/sales" ? style.path_button_focus : style.path_button
            }
          >
            SALES
          </div>
        </button>
        <button
          className={style.bottom_container_button}
          onClick={() => navigate("/rules")}
        >
          <div
            className={
              path === "/rules" ? style.path_button_focus : style.path_button
            }
          >
            RULES
          </div>
        </button>
        <button
          className={style.bottom_container_button}
          onClick={() => navigate("/questions")}
        >
          <div
            className={
              path === "/questions"
                ? style.path_button_focus
                : style.path_button
            }
          >
            QUESTIONS
          </div>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
