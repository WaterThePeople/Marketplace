import React, { useState, useEffect } from "react";
import style from "./Home.module.sass";
import SliderHomeItem from "../../components/SliderHomeItem/SliderHomeItem";
import NewlyAddedHomeItem from "../../components/NewlyAddedHomeItem/NewlyAddedHomeItem";
import OverallHomeItem from "../../components/OverallHomeItem/OverallHomeItem";
import axios from "axios";

const overallList = ["POPULAR", "BESTSELLERS", "ON SALE"];

function Home() {
  const [currentRecommendedID, setCurrentRecommendedID] = useState(0);
  const [newlyAddedID, setNewlyAddedID] = useState(0);
  const [currentOverallItem, setCurrentOverallItem] = useState("POPULAR");

  const [recommendedList, setRecommendedList] = useState<any[]>([]);
  const [newlyAddedList, setNewlyAddedList] = useState<any[]>([]);
  const [popularList, setPopularList] = useState<any[]>([]);
  const [bestsellersList, setBestsellersList] = useState<any[]>([]);
  const [saleList, setSaleList] = useState<any[]>([]);

  const fetchRecommended = () => {
    axios
      .get("api/home?recommended=true&limit=4")
      .then((response) => {
        const data = response?.data?.results;
        setRecommendedList(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const fetchNew = () => {
    axios
      .get("api/home?new=true&limit=6")
      .then((response) => {
        const data = response?.data?.results;
        setNewlyAddedList(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const fetchPopular = () => {
    axios
      .get("api/home?popular=true&limit=8")
      .then((response) => {
        const data = response.data.results;
        setPopularList(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const fetchSale = () => {
    axios
      .get("api/home?sale=true&limit=8")
      .then((response) => {
        const data = response.data.results;
        setSaleList(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const fetchBestsellers = () => {
    axios
      .get("api/home?bestsellers=true&limit=8")
      .then((response) => {
        const data = response.data.results;
        setBestsellersList(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

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

  useEffect(() => {
    fetchRecommended();
    fetchNew();
    fetchPopular();
    fetchBestsellers();
    fetchSale();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.recommended_text}>RECOMMENDED</div>
      <div className={style.slider_container}>
        <button
          className={style.slider_button}
          onClick={() => previousRecommended()}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/arrow.png"}
            alt="background_image"
            className={style.arrow_left}
          />
        </button>

        <SliderHomeItem
          name={recommendedList[currentRecommendedID]?.name}
          price={recommendedList[currentRecommendedID]?.price}
          image={recommendedList[currentRecommendedID]?.image}
        />
        <button
          className={style.slider_button}
          onClick={() => nextRecommended()}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/arrow.png"}
            alt="background_image"
            className={style.arrow_right}
          />
        </button>
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
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/arrow.png"}
            alt="background_image"
            className={style.arrow_left}
          />
        </button>
        <div className={style.container_newly_added}>
          <NewlyAddedHomeItem
            name={newlyAddedList[calcPosition(newlyAddedID)]?.name}
            price={newlyAddedList[calcPosition(newlyAddedID)]?.price}
            image={newlyAddedList[calcPosition(newlyAddedID)]?.image}
          />
          <NewlyAddedHomeItem
            name={newlyAddedList[calcPosition(newlyAddedID + 1)]?.name}
            price={newlyAddedList[calcPosition(newlyAddedID + 1)]?.price}
            image={newlyAddedList[calcPosition(newlyAddedID + 1)]?.image}
          />
          <NewlyAddedHomeItem
            name={newlyAddedList[calcPosition(newlyAddedID + 2)]?.name}
            price={newlyAddedList[calcPosition(newlyAddedID + 2)]?.price}
            image={newlyAddedList[calcPosition(newlyAddedID + 2)]?.image}
          />
        </div>
        <button
          className={style.slider_button_newly_added}
          onClick={() => nextNewlyAdded()}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/arrow.png"}
            alt="background_image"
            className={style.arrow_right}
          />
        </button>
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
        <div className={style.overall_tab}>
          {currentOverallItem === "POPULAR" &&
            popularList.map((item, index) => (
              <OverallHomeItem data={item} key={index} />
            ))}
          {currentOverallItem === "BESTSELLERS" &&
            bestsellersList.map((item, index) => (
              <OverallHomeItem data={item} key={index} />
            ))}
          {currentOverallItem === "ON SALE" &&
            saleList.map((item, index) => (
              <OverallHomeItem data={item} key={index} sale={true} />
            ))}
        </div>
        <div className={style.footer}>
          SOMEegro created and developed by:
          <br />
          Maksymilian Skrzypczak 22088
          <br />
          Kamil Wolański 22311
          <br />
          Contact Email: test@gmail.com
          <br />
          Contact Phone Number: 123 456 789
        </div>
      </div>
    </div>
  );
}

export default Home;
