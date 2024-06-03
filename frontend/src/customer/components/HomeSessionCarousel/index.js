import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCard";
import { Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const HomeSessionCarousel = ({ data, sessionTitle }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    0: { items: 1.5 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const slidePrev = () => setActiveIndex(activeIndex - 1);

  const slideNext = () => setActiveIndex(activeIndex + 1);

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data
    .slice(0, 10)
    .map((item) => <HomeSectionCard item={item} />);

  return (
    <div className="relative lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 p-4">{sessionTitle}</h2>
      <div className="relative lg:border pl-2 lg:p-5">
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
        {window.innerWidth >= 720 && activeIndex !== 0 && (
          <Button
            variant="contained"
            className="z-50"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translate(-50%) rotate(90deg)",
              bgcolor: "white",
              borderRadius: "50%", // Make the button circular
              height: "4rem", // Adjust height to maintain circular shape
            }}
            onClick={() => slidePrev()}
          >
            <KeyboardArrowLeft
              sx={{ transform: "rotate(-90deg)", color: "black" }}
            />
          </Button>
        )}
        {window.innerWidth >= 720 && activeIndex !== items.length - 1 && (
          <Button
            variant="contained"
            className="z-50"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translate(50%) rotate(90deg)",
              bgcolor: "white",
              borderRadius: "50%", // Make the button circular
              height: "4rem", // Adjust height to maintain circular shape
            }}
            onClick={() => slideNext()}
          >
            <KeyboardArrowRight
              sx={{ transform: "rotate(-90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSessionCarousel;
