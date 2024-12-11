import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Box } from '@mui/material';
import ConcertDetail from './ConcertDetail';
import BookingForm from './BookingForm';
import darkTheme from '../../../theme';
import { ThemeProvider } from '@mui/material/styles';
import StepsBar from './StepsBar';
import Confirmation from './Confirmation';
import Payment from './Payment';
import Result from './Result';
import { concertDetail } from '../../../api/concertDetailApi';

const mockedConcertData = {
  success: true,
  errorMsg: null,
  data: {
    concertId: 4,
    concertName: 'Concert D',
    concertStartTime: '2023-12-04T21:00:00Z',
    concertDuration: 2.0,
    concertImage: 'imageD.jpg',
    concertDescription: 'Concert D promises an evening of high-energy music and unforgettable moments.',
    concertSaleTime: '2024-12-10T09:53:00Z',
    venueId: 4,
    venueCountry: 'Australia',
    venueCity: 'Sydney',
    venueAddress: '101 George St',
    venueImage: 'image4.jpg',
    areas: [
      {
        id: 7,
        total: 130,
        available: 130,
        price: 65.0,
        areaType: 'VIP',
      },
      {
        id: 8,
        total: 230,
        available: 230,
        price: 40.0,
        areaType: 'General',
      },
    ],
  },
};

const BookingPage = () => {
  const { concert_id } = useParams();
  const [concert, setConcert] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    concertId: concert_id,
    audienceCount: 1,
    areaPreferences: Array(mockedConcertData.data.areas.length).fill(''),
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
      }
    });
    // setConcert(mockedConcertData.data);
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
      audienceDetails: Array(prevFormData.audienceCount).fill({ name: '', idCard: '' }),
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
