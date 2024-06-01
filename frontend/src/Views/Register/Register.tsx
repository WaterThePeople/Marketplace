import React, { useEffect, useState } from "react";
import style from "./Register.module.sass";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverPath } from "../../BackendServerPath";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [success, setSuccess] = useState(false);

  const register = () => {
    axios
      .post(
        `${serverPath}api/register/`,
        {
          email: email,
          password: password,
          username: name,
        },
        {}
      )
      .then((response) => {
        console.log(response);
        setSuccess(true);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setErrorName(error?.response?.data?.username?.[0]);
          if (email === "") {
            setErrorEmail("This field may not be blank.");
          } else {
            setErrorEmail(error?.response?.data?.email?.[0]);
          }
          setErrorPassword(error?.response?.data?.password?.[0]);
        }
      });
  };

  const onRegister = () => {
    register();
  };

  useEffect(() => {
    setErrorName("");
  }, [name]);

  useEffect(() => {
    setErrorEmail("");
  }, [email]);

  useEffect(() => {
    setErrorPassword("");
  }, [password]);

  return (
    <div className={style.container}>
      <button className={style.back_button} onClick={() => navigate("/")}>
        Home Page
      </button>

      {!success ? (
        <div className={style.login_container}>
          <div className={style.image_container}>
            <div className={style.image_background} />
            <div className={style.image_background_2} />
            <img
              src={process.env.PUBLIC_URL + "/register.png"}
              alt="Logo"
              className={style.image}
            />
          </div>
          <div className={style.password_container}>
            <input
              className={style.input}
              value={name}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              autoComplete="new-password"
            ></input>
            {errorName && <div className={style.text_red}>{errorName}</div>}
          </div>
          <div className={style.password_container}>
            <input
              className={style.input}
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-password"
            ></input>
            {errorEmail && <div className={style.text_red}>{errorEmail}</div>}
          </div>
          <div className={style.password_container}>
            <input
              className={style.input}
              autoComplete="new-password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {errorPassword && (
              <div className={style.text_red}>{errorPassword}</div>
            )}
            {/* <div className={style.text}>
            Password needs to be at least 8 characters long.
          </div> */}
          </div>
          <button className={style.login_button} onClick={() => onRegister()}>
            Register
          </button>
          <a className={style.register_link} onClick={() => navigate("/login")}>
            Already have an account? Login here!
          </a>
        </div>
      ) : (
        <div className={style.success_container}>
          <div className={style.text_large}>Account has been created!</div>
          <button
            className={style.login_button}
            onClick={() => navigate("/login")}
          >
            Go to login
          </button>
        </div>
      )}
    </div>
  );
}

export default Register;
