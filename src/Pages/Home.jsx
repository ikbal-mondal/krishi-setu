import React from "react";
import HeroSlider from "../Components/HeroSlider";
import LatestCrops from "../Components/LatestCrops";
import HowItWorks from "../Components/HowItWorks";
import AgroNews from "../Components/AgroNews";

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <LatestCrops></LatestCrops>
      <HowItWorks></HowItWorks>
      <AgroNews></AgroNews>
    </div>
  );
};

export default Home;
