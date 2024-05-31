import React, { useState, useEffect } from "react";
import style from "./NavBar.module.sass";
import Logo from "../components/Logo/Logo";
import ShoppingCartButton from "../components/ShoppingCartButton/ShoppingCartButton";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../utils/useWindowDimensions";

function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  let navigate = useNavigate();

  const path = window.location.pathname;

  const { height, width } = useWindowDimensions();

  const [visibleNavbar, setVisibleNavbar] = useState(true);

  useEffect(() => {
    if (path === "/login") {
      setVisibleNavbar(false);
    } else if (path === "/register") {
      setVisibleNavbar(false);
    } else {
      setVisibleNavbar(true);
    }
  }, [path]);

  return visibleNavbar ? (
    <>
      <div className={style.container}>
        <div className={style.top_container}>
          <div className={style.logo_and_search}>
            <Logo />
          </div>
          <div className={style.user}>
            <ShoppingCartButton />
            {isLoggedIn ? (
              <div className={style.logged}>Water The People</div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className={style.not_logged}
              >
                Login
              </button>
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
                path === "/products"
                  ? style.path_button_focus
                  : style.path_button
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
      <div className={style.separator} />
    </>
  ) : (
    <></>
  );
}

export default Navbar;
