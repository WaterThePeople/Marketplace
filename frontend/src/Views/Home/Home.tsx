import React, { useState, useEffect } from "react";
import style from "./Home.module.sass";
import axios from "axios";

function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get("/api/TestItems/")
      .then((response) => {
        const data = response.data;
        setData(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  console.log(data);

  return (
    <div>
      <div className={style.container}>Home page</div>
      <div className={style.grid}>
        Data test:
        {data?.map((item) => (
          <div className={style.item_container}>
            <div className={style.item}>
              <div>{item.id}</div>
              <div>{item.title}</div>
              <div>{item.description}</div>
              <div>{item.completed ? "Completed" : "Not completed"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
