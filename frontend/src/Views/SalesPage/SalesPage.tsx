import React, { useState, useEffect, useRef } from "react";
import style from "./SalesPage.module.sass";

import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import FiltersCard from "../../components/FiltersCard/FiltersCard";
import ProductsPageItem from "../../components/ProductsPageItem/ProductsPageItem";
import Pagination from "../../components/Pagination/Pagination";

import axios from "axios";
import { serverPath } from "../../BackendServerPath";

function SalesPage() {
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

  const [gameBudget, setGameBudget] = useState([
    { name: "AAA", check: false },
    { name: "AA", check: false },
    { name: "INDIE", check: false },
  ]);

  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<any[]>([]);
  const [selectedBudget, setSelectedBudget] = useState("");

  const [currentCategories, setCurrentCategories] = useState("");
  const [currentPlatforms, setCurrentPlatforms] = useState("");

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
        `${serverPath}api/allGame?limit=${limit}&offset=${count}&yearrange=${minYear}%2C${maxYear}&discountedpricerange=${minPrice}%2C${maxPrice}&order=${order}&budget=${selectedBudget}${currentCategories}${currentPlatforms}&sale=true`
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

  useEffect(() => {
    fetchItems();
  }, [count]);

  useEffect(() => {
    setCount((currentPage - 1) * limit);
  }, [currentPage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchItems();
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [
    minYear,
    maxYear,
    minPrice,
    maxPrice,
    order,
    selectedBudget,
    currentCategories,
    currentPlatforms,
  ]);

  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.categories}>
          <CategoriesCard
            category={categories}
            gameBudget={gameBudget}
            platform={platforms}
            setGameBudget={setGameBudget}
            setSelectedCategories={setSelectedCategories}
            setSelectedPlatforms={setSelectedPlatforms}
            setSelectedBudget={setSelectedBudget}
            selectedCategories={selectedCategories}
            selectedPlatforms={selectedPlatforms}
            setCurrentCategories={setCurrentCategories}
            setCurrentPlatforms={setCurrentPlatforms}
          />
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

export default SalesPage;
