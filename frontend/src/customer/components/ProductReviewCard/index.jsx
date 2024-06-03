import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = () => {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              xs={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            >
              R
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">John Doe</p>
              <p className="opacity-70">March 3, 2024</p>
            </div>
          </div>
          <Rating value={4.5} name="half-rating" readOnly precision={0.5} />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
            officia aperiam perspiciatis ex modi nobis consequuntur nulla
            voluptatem. Rem, ullam! Ipsum, quis similique excepturi velit sed
            exercitationem voluptatem tenetur saepe.
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
