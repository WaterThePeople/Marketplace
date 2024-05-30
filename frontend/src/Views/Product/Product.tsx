import React, { useEffect, useState } from "react";
import style from "./Product.module.sass";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverPath } from "../../BackendServerPath";

const platforms = ["PC", "Nintendo Switch", "Xbox One", "PS4", "PS5"];
const categories = ["RPG", "Action", "Adventure"];

function Product() {
  const { id } = useParams();

  const [item, setItem] = useState({
    name: "",
    price: "",
    image: "",
    id: 0,
  });

  const fetchItem = () => {
    axios
      .get(`${serverPath}api/allGame/modDel/${id}`)
      .then((response) => {
        setItem(response?.data);
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
    fetchItem();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.item}>
          <div className={style.name}>{item?.name}</div>
          <img
            src={process.env.PUBLIC_URL + item?.image}
            className={style.image}
          />
        </div>
        <div className={style.info}>
          <div className={style.info_top}>
            <div className={style.text_line}>
              <div className={style.id}>Product ID: {id}</div>
              <div className={style.text_container}>
                <div className={style.text_title}>Release date:</div>
                <div className={style.text}>2018</div>
              </div>
            </div>
            <div className={style.text_line}>
              <div className={style.text_container}>
                <div className={style.text_title}>Developer:</div>
                <div className={style.text}>From Software</div>
              </div>
              <div className={style.text_container}>
                <div className={style.text_title}>Budget:</div>
                <div className={style.text}>AAA</div>
              </div>
            </div>
          </div>
          <div className={style.separator_horizontal} />
          <div className={style.info_bottom}>
            <div className={style.text_container_col}>
              <div className={style.text_title}>Platforms:</div>
              {platforms.map((item, index) => (
                <div className={style.text} key={index}>
                  -{item}
                </div>
              ))}
            </div>
            <div className={style.text_container_col}>
              <div className={style.text_title}>Categories:</div>
              {categories.map((item, index) => (
                <div className={style.text} key={index}>
                  -{item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={style.buy}>
          <div className={style.price_container}>
            <div className={style.price}>{item?.price}zł</div>
          </div>
          <div className={style.separator_horizontal} />
          <div className={style.buttons_container}>
            <button className={style.button}>ADD TO CART</button>
            <button className={style.button}>BUY</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
