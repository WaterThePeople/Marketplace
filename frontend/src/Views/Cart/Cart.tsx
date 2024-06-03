// @ts-nocheck
import React, { useState, useEffect } from "react";
import style from "./Cart.module.sass";
import { useNavigate } from "react-router-dom";
import { serverPath } from "../../BackendServerPath";
import axios from "axios";

function Cart() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [fullPrice, setFullPrice] = useState(0);

  const fetchItem = async (id: number) => {
    axios
      .get(`${serverPath}api/allGame/modDel/${id}`)
      .then((response) => {
        setCartItems((cartItems) => [...cartItems, response?.data]);
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
    const items = JSON.parse(localStorage.getItem("cartItems") || "{}");
    if (items) {
      setItems(items);
    }
  }, []);

  const fetchAllItems = async () => {
    if (items.length > 0) {
      await Promise.all(
        items?.map((item, index) => {
          fetchItem(item);
        })
      );
    }
  };

  useEffect(() => {
    setCartItems([]);
    fetchAllItems();
  }, [items]);

  useEffect(() => {
    let x = 0;
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i]?.sale) {
        x = x + cartItems[i]?.discount_price;
      } else {
        x = x + cartItems[i]?.price;
      }
    }
    setFullPrice(x);
  }, [cartItems]);

  const removeItem = (id: number) => {
    let temp = items;
    for (var i = 0; i < items.length; i++) {
      if (parseInt(items[i]) === parseInt(id)) {
        temp.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(temp));
    setItems(temp);
    setCartItems([]);
    fetchAllItems();
  };

  return (
    <div className={style.container}>
      <button className={style.buy}>
        Go to payment - {Math.floor(parseFloat(fullPrice) * 100) / 100}zł
      </button>
      <div className={style.cart_container}>
        {cartItems?.length > 0 &&
          cartItems?.map((item, index) => (
            <>
              <div className={style.item_container} key={index}>
                <img
                  src={process.env.PUBLIC_URL + item?.image}
                  alt="image"
                  className={style.image}
                />
                <div className={style.separator_vertical} />
                <div
                  className={style.item_name}
                  onClick={() => navigate(`/products/${item?.id}`)}
                >
                  {item?.name}
                </div>
                <div className={style.separator_vertical} />
                <div
                  className={
                    item?.sale ? style.item_price_sale : style.item_price
                  }
                >
                  {item?.sale
                    ? Math.floor(parseFloat(item?.discount_price) * 100) / 100
                    : item.price}
                  zł
                </div>
                <div className={style.separator_vertical} />
                <button
                  className={style.remove}
                  onClick={() => removeItem(item?.id)}
                >
                  Remove product
                </button>
              </div>
              {index < cartItems.length - 1 && (
                <div className={style.separator_horizontal} />
              )}
            </>
          ))}
      </div>
    </div>
  );
}

export default Cart;
