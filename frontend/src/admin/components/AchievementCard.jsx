import { Button, Card, CardContent, Typography, styled } from "@mui/material";
import React from "react";

const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

function AchievementCard() {
  return (
    <Card sx={{ position: "relative", bgcolor: "#242B2E", color: "white" }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          E-Commerce
        </Typography>
        <Typography variant="body2">Congrats</Typography>
        <Typography variant="h5" sx={{ my: 3 }}>
          0
        </Typography>
        <Button size="small" variant="contained">
          View Sales
        </Button>
        <TriangleImg src="/trophy.png" />
      </CardContent>
    </Card>
  );
}

export default AchievementCard;
