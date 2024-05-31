// @ts-nocheck
import React, { useState, useEffect } from "react";
import style from "./Cart.module.sass";
import { useNavigate } from "react-router-dom";
import { serverPath } from "../../BackendServerPath";
import axios from "axios";

function Cart() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [cartItems, setCartIems] = useState([]);

  const [visible, setVisible] = useState(false);

  const fetchItem = (id: number) => {
    let temp = cartItems;
    axios
      .get(`${serverPath}api/allGame/modDel/${id}`)
      .then((response) => {
        temp?.push(response?.data);
        setCartIems(temp);
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
    await Promise.all(
      items.map((item, index) => {
        fetchItem(item);
      })
    );
    setVisible(true);
  };

  useEffect(() => {
    setCartIems([]);
    fetchAllItems();
  }, [items]);

  console.log(cartItems);

  return (
    <div className={style.container}>
      <div className={style.cart_container}>
        {visible && (
          <>
            {cartItems.map((item, index) => (
              <div className={style.item} key={index}>
                {item?.name}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
