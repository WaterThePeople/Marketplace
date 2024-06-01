import React, { useState, useEffect } from "react";
import style from "./CategoriesCard.module.sass";

function CategoriesCard({
  category,
  gameBudget,
  platform,
  setSelectedCategories,
  setSelectedPlatforms,
  setGameBudget,
  setSelectedBudget,
  selectedCategories,
  selectedPlatforms,
  setCurrentCategories,
  setCurrentPlatforms,
}: {
  category: any[];
  gameBudget: any[];
  platform: any[];
  selectedCategories: any[];
  selectedPlatforms: any[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<any[]>>;
  setGameBudget: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedBudget: React.Dispatch<React.SetStateAction<string>>;
  setCurrentCategories: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPlatforms: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [checkboxChanged, setCheckboxChanged] = useState(false);
  const changeBudget = (budget: string) => {
    let temp = gameBudget;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i]?.name === budget) {
        temp[i].check = !temp[i].check;
      } else {
        temp[i].check = false;
      }
    }
    setGameBudget(temp);
    setCheckboxChanged(!checkboxChanged);
  };

  const Checkbox = ({
    check,
    name,
    change,
  }: {
    check: boolean;
    name: string;
    change: boolean;
  }) => {
    const [checked, setChecked] = useState(check);

    useEffect(() => {
      setChecked(check);
    }, [change]);

    return (
      <input
        className={style.item_checkbox}
        type="checkbox"
        checked={checked}
        onClick={() => changeBudget(name)}
      />
    );
  };

  useEffect(() => {
    let temp = 0;
    gameBudget.map((item, index) => {
      if (item?.check) {
        setSelectedBudget(item?.name);
      } else {
        temp = temp + 1;
      }
    });
    if (temp === 3) {
      setSelectedBudget("");
    }
  }, [checkboxChanged]);

  const changeCategories = (name: string) => {
    let temp = selectedCategories;
    if (temp.includes(name)) {
      var index = temp.indexOf(name);
      if (index !== -1) {
        temp.splice(index, 1);
      }
    } else {
      temp.push(name);
    }
    setSelectedCategories(temp);
    let x = "";
    temp.map((item, index) => {
      x = x + "&category=" + item;
    });
    setCurrentCategories(x);
  };

  const changePlatforms = (name: string) => {
    let temp = selectedPlatforms;
    if (temp.includes(name)) {
      var index = temp.indexOf(name);
      if (index !== -1) {
        temp.splice(index, 1);
      }
    } else {
      temp.push(name);
    }
    setSelectedPlatforms(temp);
    let x = "";
    temp.map((item, index) => {
      x = x + "&platform=" + item;
    });
    setCurrentPlatforms(x);
  };

  return (
    <div className={style.container}>
      <div className={style.category_container}>
        <div className={style.category}>Category:</div>
        {category.map((item, index) => (
          <div className={style.item} key={index}>
            <input
              className={style.item_checkbox}
              type="checkbox"
              onClick={() => changeCategories(item?.category_name)}
            />
            <div className={style.text}>{item?.category_name}</div>
          </div>
        ))}
      </div>
      <div className={style.category_container}>
        <div className={style.category}>Budget:</div>
        {gameBudget.map((item, index) => (
          <div className={style.item} key={index}>
            <Checkbox
              check={item?.check}
              name={item?.name}
              change={checkboxChanged}
            />
            <div className={style.text}>{item?.name}</div>
          </div>
        ))}
      </div>
      <div className={style.category_container}>
        <div className={style.category}>Platform:</div>
        {platform.map((item, index) => (
          <div className={style.item} key={index}>
            <input
              className={style.item_checkbox}
              type="checkbox"
              onClick={() => changePlatforms(item?.platform_name)}
            />
            <div className={style.text}>{item?.platform_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesCard;
