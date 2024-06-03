import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary";
import DeliveryAddressForm from "../../components/DeliveryAddressForm";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);

  const step = querySearch.get("step");

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="px-5 lg:px-40 mt-5">
        <Button onClick={handleBack}>Prev</Button>
        <div className="mt-5">
          {step == 2 ? <DeliveryAddressForm /> : <CheckoutSummary />}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
