import React, { useState, useEffect } from "react";
import style from "./UserSettings.module.sass";
import { useNavigate } from "react-router-dom";

function UserSettings({}: {}) {
  let navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const [username, setUsername] = useState<string | null>("User");

  useEffect(() => {
    setUsername(localStorage.getItem("userName"));
  }, []);

  const logout = () => {
    window.location.reload();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("cartItems");
  };

  const games = () => {
    setVisible(false);
    navigate("/usergames");
  };

  const add = () => {
    setVisible(false);
    navigate("/add");
  };

  return (
    <div className={style.container}>
      <button
        className={visible ? style.button_modal : style.button}
        onClick={() => setVisible(!visible)}
      >
        <div className={style.text}>{username ? username : "User"}</div>
      </button>
      {visible && (
        <div className={style.modal}>
          <button className={style.modal_item} onClick={() => add()}>
            Add game
          </button>
          <button className={style.modal_item} onClick={() => games()}>
            Your games list
          </button>
          <button className={style.modal_item} onClick={() => logout()}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSettings;
