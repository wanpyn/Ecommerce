import React from "react";

const HomeSectionCard = ({ item }) => {
  console.log(item.imageUrl);
  const {
    imageUrl,
    brand,
    title,
    color,
    discountedPrice,
    price,
    discountPersent,
    size,
  } = item;
  return (
    <div className="cursor-pointer flex flex-col items-center w-max-[15rem] m-3 bg-white rounded-lg overflow-hidden">
      <div className="h-[15rem] w-[12rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={imageUrl}
          alt="men"
        />
      </div>
      <div className="px-7 py-3 h-[6rem]">
        <h3 className="font-semibold text-gray-900">{brand}</h3>
        <p className="mt-1 text-sm font-light text-gray-800">{title}</p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
