import React from "react";
import CartItem from "../../components/CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  return (
    <div className="mx-12">
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {[1, 1, 1].map((item) => (
            <CartItem />
          ))}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border p-5 shadow-lg">
            <h1 className="text-lg opacity-50 font-bold">PRICE DETAILS</h1>
            <div className="space-y-3 mt-6 mb-10 font-bold">
              <div className="flex justify-between">
                <div className="opacity-70">Price (3 items)</div>
                <div className="text-black">₹4697</div>
              </div>
              <div className="flex justify-between">
                <div className="opacity-70">Discount</div>
                <div className="text-green-600">-₹3419</div>
              </div>
              <div className="flex justify-between">
                <div className="opacity-70">Delivery Charge</div>
                <div className="text-green-600">Free</div>
              </div>
              <div className="border-t h-1 w-full text-gray-600"></div>
              <div className="flex justify-between">
                <div className="text-lg  opacity-90">Total Amount</div>
                <div className="text-lg  text-green-600">₹1278</div>
              </div>
            </div>
            <Button
              variant="contained"
              className="w-full"
              sx={{ py: "0.7rem", bgcolor: "#9155fd" }}
              onClick={handleCheckout}
            >
              CHECK OUT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
