import React, { useState } from "react";
import style from "./DropdownModal.module.sass";

function DropdownModal({
  value,
  setValue,
  array,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  array: string[];
}) {
  const [visible, setVisible] = useState(false);

  const onSelect = (item: string) => {
    setValue(item);
    setVisible(false);
  };

  return (
    <div className={style.container}>
      <button
        className={visible ? style.button_modal : style.button}
        onClick={() => setVisible(!visible)}
      >
        <div className={style.text}>{value}</div>
        <img
          src={process.env.PUBLIC_URL + "/assets/arrow.png"}
          alt="background_image"
          className={visible ? style.arrow_up : style.arrow_down}
        />
      </button>
      {visible && (
        <div className={style.modal}>
          {array.map((item, index) => (
            <button
              className={
                value === item ? style.modal_item_current : style.modal_item
              }
              key={index}
              onClick={() => onSelect(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownModal;
