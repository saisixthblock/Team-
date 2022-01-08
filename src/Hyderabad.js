import React from "react";
import Repalle from "./Repalle";
import Godavari from "./Godavari";
const Hyderabad = () => {
  const tejuInfo = { name: "tejaswini", town: "from guntur" };
  const divyaInfo = { name: "divya", town: "from godavari" };
  return (
    <>
      <h1>who lives in hyderabad?</h1>
      <Repalle teju={tejuInfo} />;
      {/* we are importing repalle component then added features or properties of all hyderabad to repalle. Then repalle teju have all access  */}
      <Godavari divya={divyaInfo} />
    </>
  );
};
export default Hyderabad;
