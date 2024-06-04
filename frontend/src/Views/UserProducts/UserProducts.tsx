import React, { useState, useEffect, useRef } from "react";
import style from "./UserProducts.module.sass";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverPath } from "../../BackendServerPath";

function UserProducts() {
  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const [count, setCount] = useState(0);
  const [maxCount, setMaxCount] = useState(10);
  const limit = 5;

  const [products, setProducts] = useState([
    {
      name: "",
      image: "",
      price: "",
      id: 0,
      sale: false,
      discount_price: "",
    },
  ]);

  const accessToken = localStorage.getItem("accessToken");

  const fetchItems = () => {
    axios
      .get(
        `${serverPath}api/allGame?limit=${limit}&offset=${count}&onlyOwner=true`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((response) => {
        setProducts(response?.data?.results);
        setMaxCount(response?.data?.count);
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
    fetchItems();
  }, [count]);

  useEffect(() => {
    setCount((currentPage - 1) * limit);
  }, [currentPage]);

  const deleteItem = (id: number) => {
    axios
      .delete(`${serverPath}/api/allGame/modDel/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        fetchItems();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.title}>
          Here you can see your currently put up games
        </div>
        {products.length > 0 &&
          products?.map((item, index) => (
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
                  className={style.edit}
                  onClick={() => navigate(`/edit/${item?.id}`)}
                >
                  Edit
                </button>
                <button
                  className={style.remove}
                  onClick={() => deleteItem(item?.id)}
                >
                  Delete
                </button>
              </div>
              {index < products.length - 1 && (
                <div className={style.separator_horizontal} />
              )}
            </>
          ))}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={limit}
          amount={maxCount}
        />
      </div>
    </div>
  );
}

export default UserProducts;
