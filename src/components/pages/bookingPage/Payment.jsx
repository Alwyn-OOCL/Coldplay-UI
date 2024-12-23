import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getPaymentChannels,
  makePayment,
} from "../../../api/pages/bookingPage/bookingApi";
import CreditCardForm from "./CreditCardForm";
import LoadingPayment from "./LoadingPayment";

const Payment = ({ formData, handleChange, handleNext, bookingData }) => {
  const [errors, setErrors] = useState({});
  const [paymentChannels, setPaymentChannels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentChannels = async () => {
      try {
        const response = await getPaymentChannels();
        const channels = response.data.data;
        setPaymentChannels(channels);
        if (channels.length > 0 && !formData.channelId) {
          handleChange("channelId")({ target: { value: channels[0].id } });
        }
      } catch (error) {
        console.error("Error getting payment channels:", error);
      }
    };

    fetchPaymentChannels();
  }, [formData.channelId, handleChange]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.channelId) {
      newErrors.channelId = "Payment method is required";
    }
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Credit Card Number is required";
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry Date is required";
    }
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(async () => {
        try {
          const paymentData = {
            channelId: formData.channelId,
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            amount: bookingData.amount,
            totalPrice: bookingData.price * bookingData.amount,
            audienceDetails: formData.audienceDetails,
          };
          const response = await makePayment(bookingData.orderId, paymentData);
          setLoading(false);
          handleNext(response.data);
        } catch (error) {
          setLoading(false);
          console.error("Error making payment:", error);
          setErrors({ payment: "Payment failed. Please try again." });
        }
      }, 1000);
    }
  };

  const handleFieldChange = (field) => (event) => {
    handleChange(field)(event);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const totalPrice = bookingData.price * bookingData.amount;

  return (
    <Box sx={{ position: "relative" }}>
      <LoadingPayment loading={loading} />
      <Card sx={{ opacity: loading ? 0.1 : 1 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Payment
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              <strong>Area Type:</strong> {bookingData.areaType}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Price:</strong> ${bookingData.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Amount:</strong> {bookingData.amount}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Total Price:</strong> ${totalPrice}
            </Typography>
          </Box>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <FormControl fullWidth error={!!errors.channelId}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={formData.channelId || ""}
                onChange={handleFieldChange("channelId")}
                label="Payment Method"
              >
                {paymentChannels.map((channel) => (
                  <MenuItem key={channel.id} value={channel.id}>
                    {channel.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.channelId && (
                <Typography color="error">{errors.channelId}</Typography>
              )}
            </FormControl>
            {formData.channelId && (
              <CreditCardForm
                formData={formData}
                handleFieldChange={handleFieldChange}
                errors={errors}
              />
            )}
            {errors.payment && (
              <Typography color="error">{errors.payment}</Typography>
            )}
            <button
              className="button button-primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              Pay Now
            </button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payment;
