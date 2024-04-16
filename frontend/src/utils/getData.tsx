import React, { useState, useEffect } from "react";
import axios from "axios";

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