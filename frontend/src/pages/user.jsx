import React from "react";

import Slide from "../components/Slide";

import Drone from "../components/drone";
import Footer2 from "../components/Footer2";
import About2 from "../components/About2";
import Header2 from "../components/Header2";
const User = () => {
  return (
    <div className="">
      <Header2 />
      <About2></About2>
      <Slide></Slide>
      <Drone></Drone>
      <Footer2></Footer2>
    </div>
  );
};

export default User;
