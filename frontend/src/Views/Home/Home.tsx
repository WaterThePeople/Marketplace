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

  return <div>
    Home Page
    {data.map((item,index)=>(
      <div>
        {item.id}
        {item.title}
      </div>
    ))}
    </div>;
}

export default Home;
