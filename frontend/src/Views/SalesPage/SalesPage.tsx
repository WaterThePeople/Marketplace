import React, { useState, useEffect } from "react";
import style from "./SalesPage.module.sass";

import CategoriesCard from "../../components/CategoriesCard/CategoriesCard";
import FiltersCard from "../../components/FiltersCard/FiltersCard";
import ProductsPageItem from "../../components/ProductsPageItem/ProductsPageItem";
import Pagination from "../../components/Pagination/Pagination";

const products = [
  {
    name: "Dark Souls Remastered",
    price: "149,99",
    image: "/assets/ds1.jpg",
    id: 0,
  },
  {
    name: "Sekiro: Shadows Die Twice",
    price: "249,99",
    image: "/assets/sekiro.jpg",
    id: 1,
  },
  {
    name: "Elden Ring",
    price: "244,99",
    image: "/assets/elden_ring.jpg",
    id: 2,
  },
  {
    name: "MINECRAFT",
    price: "99,99",
    image: "/assets/minecraft.jpg",
    id: 3,
  },
  {
    name: "Dark Souls III",
    price: "169,99",
    image: "/assets/ds3.jpg",
    id: 4,
  },
  {
    name: "Dark Souls II",
    price: "99,99",
    image: "/assets/ds2.jpg",
    id: 5,
  },
  {
    name: "Super Mario Odyssey",
    price: "199,99",
    image: "/assets/mario.jpg",
    id: 6,
  },
  {
    name: "Baldur's Gate III",
    price: "99,99",
    image: "/assets/baldurs_gate_3.jpg",
    id: 7,
  },
  {
    name: "Monster Hunter World",
    price: "149,99",
    image: "/assets/mhw.png",
    id: 8,
  },
  {
    name: "Monster Hunter Rise",
    price: "199,99",
    image: "/assets/mhr.jpg",
    id: 9,
  },
  {
    name: "Dark Souls III",
    price: "169,99",
    image: "/assets/ds3.jpg",
    id: 10,
  },
  {
    name: "Dark Souls II",
    price: "99,99",
    image: "/assets/ds2.jpg",
    id: 11,
  },
  {
    name: "Super Mario Odyssey",
    price: "199,99",
    image: "/assets/mario.jpg",
    id: 12,
  },
  {
    name: "Dark Souls II",
    price: "99,99",
    image: "/assets/ds2.jpg",
    id: 13,
  },
];

function SalesPage() {
  const [currentPage, setCurrentPage] = useState(1);

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
                id={item.id}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={10}
            amount={46}
          />
        </div>
      </div>
    </div>
  );
}

export default SalesPage;
