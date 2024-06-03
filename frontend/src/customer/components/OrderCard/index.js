import React from "react";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
  const navigate = useNavigate();
  const handleOrderDetails = () => {
    navigate(`/account/order/${2}`);
  };

  return (
    <div
      className="flex justify-between border shadow-sm hover:shadow-xl p-5 cursor-pointer"
      onClick={handleOrderDetails}
    >
      <div className="flex">
        <div className="w-[5rem] h-[5rem]">
          <img
            src="https://rukminim1.flixcart.com/image/612/612/l0wrafk0/dress/l/2/o/3xl-m2s13003-peach-madame-original-imagchhhwbypcann.jpeg?q=70"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="px-5 space-y-1">
          <h1 className="font-semibold">Women Asymmetric Pink Dress</h1>
          <div className="opacity-60 text-sm">Size: M</div>
        </div>
      </div>
      <div className="font-semibold mt-1">₹1099</div>
      <div className="pr-20 space-y-1">
        <div className="flex items-center">
          <ModeStandbyIcon
            sx={{ width: "15px", height: "15px", color: "#43a047" }}
          />
          <p className="font-bold mx-1">
            {false ? "Delivered On Mar 30" : "Expected Delivery On Mar 30"}
          </p>
        </div>
        <p className="text-sm font-semibold">Your item has been Shipped</p>
      </div>
    </div>
  );
};

export default OrderCard;
