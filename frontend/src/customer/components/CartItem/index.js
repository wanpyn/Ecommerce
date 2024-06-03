import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import React from "react";

const CartItem = () => {
  return (
    <div className="border p-5 shadow-lg rounded-sm">
      <div className="flex">
        <div className="h-[5rem] lg:w-[10rem] w-[5rem] lg:h-[10rem]">
          <img
            className="h-full w-full object-cover object-top"
            src="https://rukminim1.flixcart.com/image/612/612/l0wrafk0/dress/l/2/o/3xl-m2s13003-peach-madame-original-imagchhhwbypcann.jpeg?q=70"
          />
        </div>
        <div className="px-5 pt-2">
          <h1 className="mb-2 font-semibold">
            Houndstooth Rayon Blend Stitched Anarkali Gown
          </h1>
          <div className="opacity-60">Size: L, White</div>
          <div className="opacity-60">Seller: Mukesh & Co</div>
          <div className="flex mt-4 gap-x-2 items-center">
            <div className="text-lg font-semibold line-through opacity-40">
              ₹1799
            </div>
            <div className="text-lg font-semibold">₹495</div>
            <div className="text-lg font-semibold text-green-600">72% off</div>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 mt-4 ml-4">
        <div className="flex gap-x-2 items-center mr-10">
          <MinusCircleIcon className="w-6 h-6" color="#9155FD" />
          <div className="border py-[.5] px-7 rounded-sm text-center">1</div>
          <PlusCircleIcon className="w-6 h-6" color="#9155FD"/>
        </div>
        <Button variant="text">REMOVE</Button>
      </div>
    </div>
  );
};

export default CartItem;
