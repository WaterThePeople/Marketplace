import React, { useState, useEffect, useRef } from "react";
import style from "./ProductsPage.module.sass";

import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import FiltersCard from "../../components/FiltersCard/FiltersCard";
import ProductsPageItem from "../../components/ProductsPageItem/ProductsPageItem";
import Pagination from "../../components/Pagination/Pagination";

import axios from "axios";
import { serverPath } from "../../BackendServerPath";

function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const [count, setCount] = useState(0);
  const [maxCount, setMaxCount] = useState(10);
  const limit = 8;

  const [minYear, setMinYear] = useState(1973);
  const [maxYear, setMaxYear] = useState(2024);
  const startYear = 1973;
  const endYear = 2024;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const startPrice = 0;
  const endPrice = 1000;

  const [order, setOrder] = useState("-year");

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

  const fetchItems = () => {
    axios
      .get(
        `${serverPath}api/allGame?limit=${limit}&offset=${count}&yearrange=${minYear}%2C${maxYear}&discountedpricerange=${minPrice}%2C${maxPrice}&order=${order}`
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchItems();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [minYear, maxYear, minPrice, maxPrice, order]);

  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.categories}>
          <CategoriesCard />
        </div>
        <div className={style.products_container}>
          <div className={style.filters}>
            <FiltersCard
              minYear={minYear}
              setMinYear={setMinYear}
              maxYear={maxYear}
              setMaxYear={setMaxYear}
              startYear={startYear}
              endYear={endYear}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              startPrice={startPrice}
              endPrice={endPrice}
              setOrder={setOrder}
            />
          </div>
          <div className={style.products}>
            {products.map((item, index) => (
              <ProductsPageItem
                key={index}
                name={item?.name}
                image={item?.image}
                price={item?.price}
                sale={item?.sale}
                id={item?.id}
                discount_price={item?.discount_price}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={limit}
            amount={maxCount}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
