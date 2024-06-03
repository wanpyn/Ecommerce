import React from "react";
import AddressCard from "../AddressCard";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout?step=3");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      address: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zipCode"),
      phoneNumber: data.get("phoneNumber"),
    };

    console.log("address", address);
  };

  return (
    <div>
      <div className="lg:grid grid-cols-3">
        <div>
          {[1, 1].map((item) => (
            <AddressCard />
          ))}
        </div>
        <div className="col-span-2 px-5">
          <Box className="border shadow-md rounded-e-md p-7 space-y-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    placeholder="First Name*"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name*"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    placeholder="Address*"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    placeholder="City*"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    placeholder="State*"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    placeholder="Zip Code*"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number*"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{
                      bgcolor: "#9155fd",
                      py: 1.5,
                    }}
                    onClick={handleCheckout}
                  >
                    DELIVER HERE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressForm;
