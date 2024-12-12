import { Box, Card, CardContent, Container, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { concertDetail } from '../../../api/concertDetailApi';
import darkTheme from '../../../theme';
import BookingForm from './BookingForm';
import ConcertDetail from './ConcertDetail';
import Confirmation from './Confirmation';
import Payment from './Payment';
import Result from './Result';
import StepsBar from './StepsBar';


const BookingPage = () => {
  const { concert_id } = useParams();
  const [concert, setConcert] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    concertId: concert_id,
    audienceCount: 1,
    areaPreferences: Array(1).fill(''),
    audienceDetails: Array(1).fill({ name: '', idCard: '' }),
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [bookingData, setBookingData] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);

  useEffect(() => {
    // Simulate fetching data from backend
    concertDetail(concert_id).then((response) => {
      if (response.success) {
        setConcert(response.data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          areaPreferences: Array(response.data.areas.length).fill(''),
        }));
      }
    });
  }, [concert_id]);

  const handleNext = (data) => {
    if (data) {
      if (activeStep === 1) {
        setBookingData(data);
      } else if (activeStep === 2) {
        setPaymentResult(data);
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      audienceDetails: Array(parseInt(prevFormData.audienceCount)).fill({ name: '', idCard: '' }),
    }));
  }, [formData.audienceCount]);

  if (!concert) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ backgroundColor: 'black', minHeight: '100vh', padding: 2 }}>
        <Container>
          <StepsBar activeStep={activeStep} handleBack={handleBack} />
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <ConcertDetail concert={concert} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              {activeStep === 0 && <BookingForm formData={formData} handleChange={handleChange} handleNext={handleNext} concert={concert} />}
              {activeStep === 1 && <Confirmation formData={formData} handleNext={handleNext} concert={concert} />}
              {activeStep === 2 && <Payment formData={formData} handleChange={handleChange} handleNext={handleNext} bookingData={bookingData} />}
              {activeStep === 3 && <Result paymentResult={paymentResult} />}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default BookingPage;
