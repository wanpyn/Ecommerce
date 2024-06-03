import React from "react";
import OrderCard from "../../components/OrderCard";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const OrdersPage = () => {
  return (
    <div className="lg:grid grid-cols-4 gap-4 lg:mx-12 p-5 gap-x-14">
      <div className="hidden lg:flex flex-col">
        <div className="border shadow-md rounded-e-md p-5">
          <h1 className="font-bold text-lg">Filters</h1>
          <h2 className="font-semibold mt-7 mb-3">ORDER STATUS</h2>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="On The Way" />
            <FormControlLabel control={<Checkbox />} label="Delivery" />
            <FormControlLabel control={<Checkbox />} label="Cancelled" />
            <FormControlLabel control={<Checkbox />} label="Returned" />
          </FormGroup>
        </div>
      </div>
      <div className="col-span-3 space-y-5">
        {[1, 1, 1, 1, 1].map((item) => (
          <OrderCard />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
