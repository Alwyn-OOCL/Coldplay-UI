import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";

const Order = ({ order }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/orders/${order.orderId}`);
  };

  return (
    <Card
      className="order-card"
      key={order.orderId}
      sx={{ display: "flex", marginBottom: 2 }}
      onClick={handleCardClick}
    >
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
