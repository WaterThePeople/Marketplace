import React, { useState, useEffect } from "react";
import style from "./EditProduct.module.sass";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverPath } from "../../BackendServerPath";
import { useParams } from "react-router-dom";

function EditProduct() {
  let navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [file, setFile] = useState<any>();
  const [year, setYear] = useState("");
  const [developer, setDeveloper] = useState("");

  const [AA, setAA] = useState(false);
  const [AAA, setAAA] = useState(false);
  const [INDIE, setINDIE] = useState(false);

  const [categories, setCategories] = useState([
    { category_name: "RPG", id: 1 },
  ]);
  const [platforms, setPlatforms] = useState([{ platform_name: "PC", id: 1 }]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<any[]>([]);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function changeFile(e: any) {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  function changeYear(x: any) {
    if (x.length < 5) {
      setYear(x);
    }
  }

  useEffect(() => {
    if (INDIE) {
      setAA(false);
      setAAA(false);
    }
  }, [INDIE]);

  useEffect(() => {
    if (AA) {
      setINDIE(false);
      setAAA(false);
    }
  }, [AA]);

  useEffect(() => {
    if (AAA) {
      setINDIE(false);
      setAA(false);
    }
  }, [AAA]);

  const fetchCategories = () => {
    axios
      .get(`${serverPath}/api/categories`)
      .then((response) => {
        setCategories(response?.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const fetchPlatforms = () => {
    axios
      .get(`${serverPath}/api/platforms`)
      .then((response) => {
        setPlatforms(response?.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchPlatforms();
  }, []);

  const changeCategories = (name: string) => {
    let temp = selectedCategories;
    if (temp.includes(name)) {
      var index = temp.indexOf(name);
      if (index !== -1) {
        temp.splice(index, 1);
      }
    } else {
      temp.push(name);
    }
    setSelectedCategories(temp);
  };

  const changePlatforms = (name: string) => {
    let temp = selectedPlatforms;
    if (temp.includes(name)) {
      var index = temp.indexOf(name);
      if (index !== -1) {
        temp.splice(index, 1);
      }
    } else {
      temp.push(name);
    }
    setSelectedPlatforms(temp);
  };

  const addItem = () => {
    let form_data = new FormData();
    let discount_price = (parseInt(discount) / 100).toString();
    if (file) {
      form_data.append("image", file, file?.name);
    }

    form_data.append("name", name);
    form_data.append("price", price);
    form_data.append("discount", discount_price);
    form_data.append("year", year);
    form_data.append("developer", developer);
    if (AA) {
      form_data.append("budget", "AA");
    }
    if (AAA) {
      form_data.append("budget", "AAA");
    }
    if (INDIE) {
      form_data.append("budget", "INDIE");
    }
    selectedCategories.forEach((id) =>
      form_data.append("category", id.toString())
    );
    selectedPlatforms.forEach((id) =>
      form_data.append("platform", id.toString())
    );

    axios
      .put(`${serverPath}api/allGame/modDel/${id}`, form_data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setSuccess(true);
        setError(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
          setError(true);
        }
      });
  };

  return (
    <div className={style.container}>
      {!success ? (
        <div className={style.main}>
          <div className={style.main_title}>
            Here you can edit your game! You must input all the data in order to
            edit it!
          </div>
          <input
            className={style.input_name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Game name"
          ></input>
          <input
            type="number"
            step="0.01"
            className={style.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          ></input>
          <input
            type="number"
            step="0.01"
            className={style.input}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Discount in %"
          ></input>
          <input
            type="number"
            step="1"
            className={style.input}
            value={year}
            onChange={(e) => changeYear(e.target.value)}
            placeholder="Year"
          ></input>
          <input
            className={style.input_developer}
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            placeholder="Developer"
          ></input>
          <input
            className={style.input_image}
            type="file"
            onChange={(e) => changeFile(e)}
          />
          <div className={style.title}>Budget</div>
          <div className={style.main_container}>
            <div className={style.item}>
              <div className={style.item_text}>AA</div>
              <input
                className={style.item_checkbox}
                type="checkbox"
                checked={AA}
                onChange={() => setAA(!AA)}
              />
            </div>
            <div className={style.item}>
              <div className={style.item_text}>AAA</div>
              <input
                className={style.item_checkbox}
                type="checkbox"
                checked={AAA}
                onChange={() => setAAA(!AAA)}
              />
            </div>
            <div className={style.item}>
              <div className={style.item_text}>INDIE</div>
              <input
                className={style.item_checkbox}
                type="checkbox"
                checked={INDIE}
                onChange={() => setINDIE(!INDIE)}
              />
            </div>
          </div>
          <div className={style.title}>Platforms</div>
          <div className={style.main_container}>
            {platforms.map((item, index) => (
              <div className={style.item} key={index}>
                <input
                  className={style.item_checkbox}
                  type="checkbox"
                  onClick={() => changePlatforms(item?.id?.toString())}
                />
                <div className={style.text}>{item?.platform_name}</div>
              </div>
            ))}
          </div>
          <div className={style.title}>Categories</div>
          <div className={style.main_container}>
            {categories.map((item, index) => (
              <div className={style.item} key={index}>
                <input
                  className={style.item_checkbox}
                  type="checkbox"
                  onClick={() => changeCategories(item?.id?.toString())}
                />
                <div className={style.text}>{item?.category_name}</div>
              </div>
            ))}
          </div>
          {error && <div className={style.error}>Something went wrong!</div>}
          <button className={style.add_button} onClick={() => addItem()}>
            EDIT GAME
          </button>
        </div>
      ) : (
        <div className={style.main}>
          <div className={style.main_title}>
            You have succesfully edited your game!
          </div>
          <button
            className={style.add_button}
            onClick={() => navigate("/usergames")}
          >
            YOUR GAMES
          </button>
        </div>
      )}
    </div>
  );
}

export default EditProduct;
