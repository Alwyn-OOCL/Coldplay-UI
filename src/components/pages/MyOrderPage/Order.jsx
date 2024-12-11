import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const Order = ({ order }) => {
  return (
    <Card key={order.orderId} sx={{ display: "flex", marginBottom: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={order.image}
        alt={order.concertName}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography component="div" variant="h5">
            {order.concertName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="div">
            {new Date(order.startTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            {order.country}, {order.city}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            Area: {order.areaType}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Order;
