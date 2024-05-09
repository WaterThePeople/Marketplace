import React from "react";
import style from "./Product.module.sass";
import { useParams } from "react-router-dom";

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

const platforms = ["PC", "Nintendo Switch", "Xbox One", "PS4", "PS5"];
const categories = ["RPG", "Action", "Adventure"];

function Product() {
  const { id } = useParams();

  const item = products.find((x) => x.id === parseInt(id!));

  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.item}>
          <div className={style.name}>{item!.name}</div>
          <img
            src={process.env.PUBLIC_URL + item!.image}
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
