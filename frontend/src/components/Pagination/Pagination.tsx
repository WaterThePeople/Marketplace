import React, { useState, useEffect } from "react";
import style from "./Pagination.module.sass";

function Pagination({
  amount,
  currentPage,
  setCurrentPage,
  pageSize,
}: {
  amount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
}) {
  const pages = Math.ceil(amount / pageSize);

  const [manyPages, setManyPages] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    if (currentPage === 1) {
      setManyPages([currentPage, currentPage + 1, currentPage + 2, pages]);
    } else if (currentPage === pages) {
      setManyPages([1, currentPage - 2, currentPage - 1, currentPage]);
    } else if (currentPage == 2) {
      setManyPages([
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        pages,
      ]);
    } else if (currentPage == pages - 1) {
      setManyPages([
        1,
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ]);
    } else {
      setManyPages([1, currentPage - 1, currentPage, currentPage + 1, pages]);
    }
  }, [currentPage]);

  return (
    <div className={style.container}>
      {currentPage > 1 && (
        <button
          className={style.image_container}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/arrow.png"}
            alt="arrow"
            className={style.arrow_left}
          />
        </button>
      )}
      {pages <= 5
        ? [...Array(pages)].map((item, index) => (
            <button
              className={
                currentPage === index + 1
                  ? style.page_button_selected
                  : style.page_button
              }
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              <div className={style.text}>{index + 1}</div>
            </button>
          ))
        : [...Array(manyPages.length)].map((item, index) => (
            <div key={index} className={style.buttons}>
              <button
                className={
                  currentPage === manyPages[index]
                    ? style.page_button_selected
                    : style.page_button
                }
                onClick={() => setCurrentPage(manyPages[index])}
              >
                <div className={style.text}>{manyPages[index]}</div>
              </button>
              {index === 2 && currentPage === 1 && <div>...</div>}
              {index === 3 && currentPage === 2 && <div>...</div>}
              {index === 3 && currentPage === 3 && <div>...</div>}
              {index === 0 && currentPage === pages - 1 && <div>...</div>}
              {index === 0 && currentPage === pages - 2 && <div>...</div>}
              {index === 0 && currentPage === pages && <div>...</div>}
              {index === 0 && currentPage > 3 && currentPage < pages - 2 && (
                <div>...</div>
              )}
              {index === 3 && currentPage > 3 && currentPage < pages - 2 && (
                <div>...</div>
              )}
            </div>
          ))}
      {currentPage < pages && (
        <button
          className={style.image_container}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/arrow.png"}
            alt="arrow"
            className={style.arrow_right}
          />
        </button>
      )}
    </div>
  );
}

export default Pagination;
