import React, { useState } from "react";
import AddressCard from "../../components/AddressCard";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import OrderDetailsCard from "../../components/OrderDetailsCard";

const steps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

const OrderDetails = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="mx-10 lg:mx-36 space-y-6">
      <div>
        <h1 className="font-bold text-lg m-3">Delivered Address</h1>
        <AddressCard />
      </div>
      <div className="border p-5 rounded-s-md shadow-md">
        <Box sx={{ width: "100%", alignItems: "center" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
            <Button variant="text">CANCEL ORDER</Button>
          </Stepper>
        </Box>
      </div>
      <div className="space-y-5">
        {[1, 1, 1, 1, 1].map((item) => (
          <OrderDetailsCard />
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
