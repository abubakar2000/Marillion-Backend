import React, { useEffect, useState } from "react";
import { API_URL } from "../../environment";

const CarbonCredits = (props: any) => {
  const [carbonCredits, setCarbonCredits] = useState(0);

  const calculateCarbonCredits = (mID: string) => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      id: mID,
    });

    fetch(`${API_URL}/device/calculate`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((val) =>
        val.json().then((val) => {
          console.log(val);
          setCarbonCredits(val?.data ?? 0);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    calculateCarbonCredits(props.mID);
  }, []);

  return <div>{carbonCredits.toFixed(2)}</div>;
};

export default CarbonCredits;
