import React, { useState, useEffect } from "react";
import style from "./FiltersCard.module.sass";
import DoubleRangeSlider from "../DoubleRangeSlider/DoubleRangeSlider";
import DropdownModal from "../DropdownModal/DropdownModal";

const sortByList = [
  "Release year descending",
  "Release year ascending",
  "Price descending",
  "Price ascending",
];

function FiltersCard({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  startYear,
  endYear,
}: {
  minYear: number;
  setMinYear: React.Dispatch<React.SetStateAction<number>>;
  maxYear: number;
  setMaxYear: React.Dispatch<React.SetStateAction<number>>;
  startYear: number;
  endYear: number;
}) {
  const [year, setYear] = useState(1973);
  const [currentYear, setCurrentYear] = useState(2024);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const [sortBy, setSortBy] = useState(sortByList[0]);

  return (
    <div className={style.container}>
      <div className={style.item_container}>
        <div className={style.text}>Release year:</div>
        <div className={style.slider_container}>
          <div className={style.slider_container_text_left}>{minYear}</div>
          <DoubleRangeSlider
            leftValue={minYear}
            setLeftValue={setMinYear}
            rightValue={maxYear}
            setRightValue={setMaxYear}
            min={startYear}
            max={endYear}
            width="100%"
          />
          <div className={style.slider_container_text_right}>{maxYear}</div>
        </div>
      </div>
      <div className={style.item_container}>
        <div className={style.text}>Price range:</div>
        <div className={style.slider_container}>
          <div className={style.slider_container_text_left}>{minPrice}zł</div>
          <DoubleRangeSlider
            leftValue={minPrice}
            setLeftValue={setMinPrice}
            rightValue={maxPrice}
            setRightValue={setMaxPrice}
            min={0}
            max={1000}
            width="100%"
          />
          <div className={style.slider_container_text_right}>{maxPrice}zł</div>
        </div>
      </div>
      <div className={style.dropdown_modal_container}>
        <DropdownModal array={sortByList} value={sortBy} setValue={setSortBy} />
      </div>
    </div>
  );
}

export default FiltersCard;
