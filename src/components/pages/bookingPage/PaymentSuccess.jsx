import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const PaymentSuccess = ({ handleNext }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Payment Successful
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for your payment!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <button className="button button-primary" onClick={handleNext}>
            Next
          </button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentSuccess;
