import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent , Box} from '@mui/material';
import ConcertDetail from './ConcertDetail';
import BookingForm from './BookingForm';
import darkTheme from '../../../theme';
import { ThemeProvider } from '@mui/material/styles';
import StepsBar from './StepsBar';
import Confirmation from './Confirmation';
import Payment from './Payment';
import Result from './Result';

const mockedConcertData = {
    concert_id: '1',
    name: 'Coldplay Live',
    startTime: '2023-12-01T20:00:00Z',
    duration: '2 hours',
    venue: {
      country: 'USA',
      city: 'New York',
      address: '123 Main St',
      sittingPlan: 'https://example.com/sitting-plan.jpg', // URL to the sitting plan image
    },
    description: 'An amazing concert by Coldplay.',
    sale_time: '2023-11-01T10:00:00Z',
    image: 'https://example.com/concert.jpg',
  };
  
  const BookingPage = () => {
    const { concert_id } = useParams();
    const [concert, setConcert] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      tickets: '',
      audienceCount: 1,
      areaPreferences: ['', '', ''],
      audienceDetails: Array(1).fill({ name: '', idCard: '' }),
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
  
    useEffect(() => {
      // Simulate fetching data from backend
      setConcert(mockedConcertData);
    }, [concert_id]);
  
    const handleNext = () => {
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
        audienceDetails: Array(prevFormData.audienceCount).fill({ name: '', idCard: '' })
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
                {activeStep === 0 && <BookingForm formData={formData} handleChange={handleChange} handleNext={handleNext} />}
                {activeStep === 1 && <Confirmation formData={formData} handleNext={handleNext} />}
                {activeStep === 2 && <Payment formData={formData} handleChange={handleChange} handleNext={handleNext} />}
                {activeStep === 3 && <Result />}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    );
  };
  
  export default BookingPage;