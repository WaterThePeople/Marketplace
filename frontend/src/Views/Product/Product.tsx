import React, { useEffect, useState } from "react";
import style from "./Product.module.sass";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverPath } from "../../BackendServerPath";
import { useNavigate } from "react-router-dom";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    name: "",
    price: "",
    image: "",
    id: 0,
    year: 2000,
    developer: "",
    budget: "",
    discount_price: "",
    sale: false,
    platform: [],
    category: [],
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

  const addToCart = () => {
    const storageItems = JSON.parse(localStorage.getItem("cartItems") || "");
    let items: number[] = [];
    items.push(item?.id);
    let cartItems = storageItems.concat(items);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    navigate("/cart");
  };

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
              <div className={style.id}>Product ID: {item?.id}</div>
              <div className={style.text_container}>
                <div className={style.text_title}>Release date:</div>
                <div className={style.text}>{item?.year}</div>
              </div>
            </div>
            <div className={style.text_line}>
              <div className={style.text_container}>
                <div className={style.text_title}>Developer:</div>
                <div className={style.text}>{item?.developer}</div>
              </div>
              <div className={style.text_container}>
                <div className={style.text_title}>Budget:</div>
                <div className={style.text}>{item?.budget}</div>
              </div>
            </div>
          </div>
          <div className={style.separator_horizontal} />
          <div className={style.info_bottom}>
            <div className={style.text_container_col}>
              <div className={style.text_title}>Platforms:</div>
              {item?.platform.map((item, index) => (
                <div className={style.text} key={index}>
                  -{item}
                </div>
              ))}
            </div>
            <div className={style.text_container_col}>
              <div className={style.text_title}>Categories:</div>
              {item?.category.map((item, index) => (
                <div className={style.text} key={index}>
                  -{item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={style.buy}>
          <div className={style.price_container}>
            {item?.sale ? (
              <>
                <div className={style.price_sale_active}>{item?.price}zł</div>
                <div className={style.price_sale}>
                  {Math.floor(parseFloat(item?.discount_price) * 100) / 100}zł
                </div>
              </>
            ) : (
              <div className={style.price}>{item?.price}zł</div>
            )}
          </div>
          <div className={style.separator_horizontal} />
          <div className={style.buttons_container}>
            <button className={style.button} onClick={() => addToCart()}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
