import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./CarouselData";

// const responsive = {
//   0: { items: 1 },
//   568: { items: 2 },
//   1024: { items: 3 },
// };

const HomeCarousel = () => {
  const items = homeCarouselData.map((item) => (
    <img src={item.image} alt="carousel" role="presentation" />
  ));

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={1000}
      infinite
      //   responsive={responsive}
        // controlsStrategy="alternate"
    />
  );
};

export default HomeCarousel;
