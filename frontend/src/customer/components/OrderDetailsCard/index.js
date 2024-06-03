import React from "react";
import StarIcon from "@mui/icons-material/Star";

const OrderDetailsCard = () => {
  return (
    <div className="lg:flex justify-between items-center border shadow-sm hover:shadow-xl p-7 cursor-pointer">
      <div className="flex">
        <div className="w-[5rem] h-[5rem]">
          <img
            src="https://rukminim1.flixcart.com/image/612/612/l0wrafk0/dress/l/2/o/3xl-m2s13003-peach-madame-original-imagchhhwbypcann.jpeg?q=70"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="px-5 space-y-1">
          <h1 className="font-semibold">Women Asymmetric Pink Dress</h1>
          <div className="flex gap-x-7">
            <p className="opacity-50 text-xs">Color: Pink</p>
            <p className="opacity-50 text-xs">Size: M</p>
          </div>
          <p className="text-xs opacity-50">Seller: RAJWADIFASHION01</p>
          <p className="text-sm font-semibold">₹499</p>
        </div>
      </div>
      <div className="flex items-center">
        <StarIcon sx={{ width: "15px", height: "15px", color: "#43a047" }} />
        <p className="font-semibold mx-1 hover:text-green-600">
          Rate & Review Product
        </p>
      </div>
    </div>
  );
};

export default OrderDetailsCard;
