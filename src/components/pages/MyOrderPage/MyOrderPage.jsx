import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getOrders } from "../../../api/pages/myOrderApi";
import { useAuth } from "../../../contexts/AuthContext";
import HomePoster from "../HomePoster/HomePoster";
import Order from "./Order";
import SortOrder from "./SortOrder";
import YearFilter from "./YearFilter";

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) {
      getOrders(userId)
        .then((response) => {
          if (response.data.success) {
            const fetchedOrders = response.data.data || [];
            const sortedOrders = fetchedOrders.sort(
              (a, b) => new Date(b.startTime) - new Date(a.startTime)
            );
            setOrders(sortedOrders);
            setFilteredOrders(sortedOrders);
          } else {
            setOrders([]);
            setFilteredOrders([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setOrders([]);
          setFilteredOrders([]);
        });
    }
  }, [userId]);

  const handleYearFilter = (year) => {
    setSelectedYear(year);
    if (year) {
      const filtered = orders.filter(
        (order) => new Date(order.startTime).getFullYear().toString() === year
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  };

  const handleSortOrder = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    const sorted = [...filteredOrders].sort((a, b) => {
      if (order === "asc") {
        return new Date(a.startTime) - new Date(b.startTime);
      } else {
        return new Date(b.startTime) - new Date(a.startTime);
      }
    });
    setFilteredOrders(sorted);
  };

  const uniqueYears = orders
    ? [
        ...new Set(
          orders.map((order) =>
            new Date(order.startTime).getFullYear().toString()
          )
        ),
      ]
    : [];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      {orders.length === 0 ? (
        <>
          <Typography variant="body1" color="textSecondary">
            You have no orders. Book a concert now!
          </Typography>
          <HomePoster />
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <YearFilter
              uniqueYears={uniqueYears}
              selectedYear={selectedYear}
              handleYearFilter={handleYearFilter}
            />
            <SortOrder
              sortOrder={sortOrder}
              handleSortOrder={handleSortOrder}
            />
          </Box>
          {filteredOrders.map((order) => (
            <Order key={order.orderId} order={order} />
          ))}
        </>
      )}
    </Box>
  );
};

export default MyOrderPage;
