import React, { useState, useEffect } from "react";
import style from "./Home.module.sass";
import SliderHomeItem from "../../components/SliderHomeItem/SliderHomeItem";
import NewlyAddedHomeItem from "../../components/NewlyAddedHomeItem/NewlyAddedHomeItem";

const recommendedList = [
  {
    name: "Elden Ring",
    price: "249,99",
    image: "/assets/elden_ring.jpg",
  },
  {
    name: "MINECRAFT",
    price: "99,99",
    image: "/assets/minecraft.jpg",
  },
  {
    name: "Super Mario Odyssey",
    price: "199,99",
    image: "/assets/mario.jpg",
  },
  {
    name: "Baldur's Gate III",
    price: "249,99",
    image: "/assets/baldurs_gate_3.jpg",
  },
];

const newlyAddedList = [
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
    name: "Dark Souls III",
    price: "169,99",
    image: "/assets/ds3.jpg",
  },
];

const overallList = ["POPULAR", "BESTSELLERS", "ON SALE"];

function Home() {
  const [currentRecommendedID, setCurrentRecommendedID] = useState(0);
  const [newlyAddedID, setNewlyAddedID] = useState(0);
  const [currentOverallItem, setCurrentOverallItem] = useState("POPULAR");

  const nextRecommended = () => {
    if (currentRecommendedID === recommendedList.length - 1) {
      setCurrentRecommendedID(0);
    } else {
      setCurrentRecommendedID(currentRecommendedID + 1);
    }
  };

  const previousRecommended = () => {
    if (currentRecommendedID === 0) {
      setCurrentRecommendedID(recommendedList.length - 1);
    } else {
      setCurrentRecommendedID(currentRecommendedID - 1);
    }
  };

  const nextNewlyAdded = () => {
    if (newlyAddedID === newlyAddedList.length) {
      setNewlyAddedID(0);
    } else {
      setNewlyAddedID(newlyAddedID + 1);
    }
  };

  const previousNewlyAdded = () => {
    if (newlyAddedID === 0) {
      setNewlyAddedID(newlyAddedList.length - 1);
    } else {
      setNewlyAddedID(newlyAddedID - 1);
    }
  };

  const calcPosition = (id: number) => {
    if (id > newlyAddedList.length - 1) {
      return id - newlyAddedList.length;
    } else {
      return id;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.recommended_text}>RECOMMENDED</div>
      <div className={style.slider_container}>
        <button
          className={style.slider_button}
          onClick={() => previousRecommended()}
        >{`<`}</button>

        <SliderHomeItem
          name={recommendedList[currentRecommendedID].name}
          price={recommendedList[currentRecommendedID].price}
          image={recommendedList[currentRecommendedID].image}
        />
        <button
          className={style.slider_button}
          onClick={() => nextRecommended()}
        >{`>`}</button>
      </div>
      <div className={style.index_container}>
        {[...Array(recommendedList.length)].map((item, index) => (
          <div
            key={index}
            className={
              currentRecommendedID === index
                ? style.index_item_focused
                : style.index_item
            }
          />
        ))}
      </div>
      <div className={style.newly_added_text}>NEWLY ADDED</div>
      <div className={style.slider_container_newly_added}>
        <button
          className={style.slider_button_newly_added}
          onClick={() => previousNewlyAdded()}
        >{`<`}</button>
        <div className={style.container_newly_added}>
          <NewlyAddedHomeItem
            name={newlyAddedList[calcPosition(newlyAddedID)].name}
            price={newlyAddedList[calcPosition(newlyAddedID)].price}
            image={newlyAddedList[calcPosition(newlyAddedID)].image}
          />
          <NewlyAddedHomeItem
            name={newlyAddedList[calcPosition(newlyAddedID + 1)].name}
            price={newlyAddedList[calcPosition(newlyAddedID + 1)].price}
            image={newlyAddedList[calcPosition(newlyAddedID + 1)].image}
          />
          <NewlyAddedHomeItem
            name={newlyAddedList[calcPosition(newlyAddedID + 2)].name}
            price={newlyAddedList[calcPosition(newlyAddedID + 2)].price}
            image={newlyAddedList[calcPosition(newlyAddedID + 2)].image}
          />
        </div>
        <button
          className={style.slider_button_newly_added}
          onClick={() => nextNewlyAdded()}
        >{`>`}</button>
      </div>
      <div className={style.overall_buttons_container}>
        {overallList.map((item, index) => (
          <button
            key={index}
            className={
              item === currentOverallItem
                ? style.overall_button_selected
                : style.overall_button
            }
            onClick={() => setCurrentOverallItem(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={style.overall_container}>

        <div className={style.footer}>
          SOMEegro created and developed by:
          Maksymilian Skrzypczak 22088
          Kamil Wolański 22311
        </div>
      </div>
    </div>
  );
}

export default Home;
