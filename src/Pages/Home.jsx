import React from "react";
import HeroSlider from "../Components/HeroSlider";
import LatestCrops from "../Components/LatestCrops";
import HowItWorks from "../Components/HowItWorks";
import AgroNews from "../Components/AgroNews";
import FarmerStories from "../Components/FarmerStories";
import CommunityImpact from "../Components/CommunityImpact";

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      <LatestCrops></LatestCrops>

      <HowItWorks></HowItWorks>
      <AgroNews></AgroNews>
      <FarmerStories></FarmerStories>
      <CommunityImpact></CommunityImpact>
    </div>
  );
};

export default Home;
