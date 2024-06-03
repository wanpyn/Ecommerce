import React from "react";
import HomeCarousel from "../../components/HomeCarousel";
import HomeSessionCarousel from "../../components/HomeSessionCarousel";
import { mens_kurta } from "../../../data/Men/men_kurta";
import { dressPage1 } from "../../../data/dress/page1";
import { mensPantsPage1 } from "../../../data/pants/men_page1";

const HomePage = () => {
  return (
    <div>
      <HomeCarousel />
      <div className="space-y-10 py-10 pl-4 lg:px-6 flex flex-col justify-center">
        <HomeSessionCarousel data={mens_kurta} sessionTitle="Men's Kurta" />
        <HomeSessionCarousel data={dressPage1} sessionTitle="Women's Dress" />
        <HomeSessionCarousel data={mensPantsPage1} sessionTitle="Men's Pant" />
      </div>
    </div>
  );
};

export default HomePage;
