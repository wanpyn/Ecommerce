import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
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

  const navigate = useNavigate();

  return (
    <div
      className="productCard w-[15rem] h-[28rem] m-3 transition-all cursor-pointer"
      onClick={() => navigate(`/product/${1}`)}
    >
      <div className="h-[20rem]">
        <img
          src={imageUrl}
          alt="product image"
          className="h-full w-full object-cover object-left-top"
        />
      </div>
      <div className="textPart space-y-1 bg-white p-3">
        <div className="space-y-1">
          <p className="font-bold">
            {brand.length > 20 ? (
              <span>{`${brand.slice(0, 20)}...`}</span>
            ) : (
              <span>{brand}</span>
            )}
          </p>
          <p className="text-sm">{title}</p>
        </div>
        {/* <div className="text-gray-600">{color}</div> */}
        <div className="flex gap-x-2">
          <div className="font-bold">₹ {discountedPrice}</div>
          <div className="opacity-50 line-through">₹{price}</div>
          <div className="text-green-600 font-semibold">
            {discountPersent}% off
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
