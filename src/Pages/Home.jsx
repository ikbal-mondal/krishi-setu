import React from "react";
import HeroSlider from "../Components/HeroSlider";
import LatestCrops from "../Components/LatestCrops";
import HowItWorks from "../Components/HowItWorks";
import AgroNews from "../Components/AgroNews";
import FarmerStories from "../Components/FarmerStories";
import CommunityImpact from "../Components/CommunityImpact";
import SafetyNotice from "../Components/SafetyNotice";

const Home = () => {
  return (
    <div>
      <title> Home | Krishi-Setu </title>
      <HeroSlider></HeroSlider>
      <LatestCrops></LatestCrops>
      <HowItWorks></HowItWorks>
      <SafetyNotice></SafetyNotice>
      <AgroNews></AgroNews>
      <FarmerStories></FarmerStories>
      <CommunityImpact></CommunityImpact>
    </div>
  );
};

export default Home;
