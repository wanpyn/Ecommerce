import {
  AccountCircle,
  AttachMoney,
  MoreVert,
  SettingsCell,
  TrendingUp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

const salesData = [
  {
    stats: "0",
    title: "Sales",
    color: "primary",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "0",
    title: "Customers",
    color: "success",
    icon: <AccountCircle sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "0",
    title: "Products",
    color: "warning",
    icon: <SettingsCell sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "0",
    title: "Revenue",
    color: "info",
    icon: <AttachMoney sx={{ fontSize: "1.75rem" }} />,
  },
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: "white",
            background: `${item.color}`,
          }}
        >
          {item.icon}
        </Avatar>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

function MonthlyOverview() {
  return (
    <Card sx={{ bgcolor: "#242B2E", color: "white" }}>
      <CardHeader
        title="Monthly Overview"
        action={
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box component="span" sx={{ fontWeight: 600, mx: 2 }}>
              Total 0
            </Box>
            this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: ".15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default MonthlyOverview;
