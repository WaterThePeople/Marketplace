import React, { useState, useEffect } from "react";
import style from "./ProductsPage.module.sass";

import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import FiltersCard from "../../components/FiltersCard/FiltersCard";
import useWindowDimensions from "../../utils/useWindowDimensions";
import ProductsPageItem from "../../components/ProductsPageItem/ProductsPageItem";

const products = [
  {
    name: "Dark Souls Remastered",
    price: "149,99",
    image: "/assets/ds1.jpg",
  },
  {
    name: "Sekiro: Shadows Die Twice",
    price: "249,99",
    image: "/assets/sekiro.jpg",
  },
  {
    name: "Elden Ring",
    price: "244,99",
    image: "/assets/elden_ring.jpg",
  },
  {
    name: "MINECRAFT",
    price: "99,99",
    image: "/assets/minecraft.jpg",
  },
  {
    name: "Dark Souls III",
    price: "169,99",
    image: "/assets/ds3.jpg",
  },
  {
    name: "Dark Souls II",
    price: "99,99",
    image: "/assets/ds2.jpg",
  },
  {
    name: "Super Mario Odyssey",
    price: "199,99",
    image: "/assets/mario.jpg",
  },
  {
    name: "Baldur's Gate III",
    price: "99,99",
    image: "/assets/baldurs_gate_3.jpg",
  },
  {
    name: "Monster Hunter World",
    price: "149,99",
    image: "/assets/mhw.png",
  },
  {
    name: "Monster Hunter Rise",
    price: "199,99",
    image: "/assets/mhr.jpg",
  },
  {
    name: "Dark Souls III",
    price: "169,99",
    image: "/assets/ds3.jpg",
  },
  {
    name: "Dark Souls II",
    price: "99,99",
    image: "/assets/ds2.jpg",
  },
  {
    name: "Super Mario Odyssey",
    price: "199,99",
    image: "/assets/mario.jpg",
  },
  {
    name: "Dark Souls II",
    price: "99,99",
    image: "/assets/ds2.jpg",
  },
];

function ProductsPage() {
  const { width, height } = useWindowDimensions();
  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.categories}>
          <CategoriesCard />
        </div>
        <div className={style.products_container}>
          <div className={style.filters}>
            <FiltersCard />
          </div>
          <div className={style.products}>
            {products.map((item, index) => (
              <ProductsPageItem
                key={index}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
