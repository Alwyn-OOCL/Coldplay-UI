import { Box, Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import { submitBooking } from '../../../api/pages/bookingPage/bookingApi';
import Loading from '../bookingPage/Loading';

const Confirmation = ({ formData, handleNext, concert }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await submitBooking({
        concertId: formData.concertId,
        audienceCount: formData.audienceCount,
        areaPreferences: formData.areaPreferences.filter(preference => preference !== 'noChoose'),
      });
      if (response.data.success) {
        handleNext(response.data.data);
      } else {
        alert(response.errorMsg);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('An error occurred while submitting the booking.');
    } finally {
      setLoading(false);
    }
  };

  const getAreaType = (areaId) => {
    const area = concert.areas.find((area) => area.id === areaId);
    return area ? area.areaType : 'No Choose';
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Confirmation
        </Typography>
        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>Number of Audience:</strong> {formData.audienceCount}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Area Preferences:</strong>
          </Typography>
          <Box sx={{ pl: 2 }}>
            {formData.areaPreferences
              .filter(preference => preference !== 'noChoose')
              .map((preference, index) => (
                <Typography key={index} variant="body2" gutterBottom>
                  <strong>Priority {index + 1}:</strong> {getAreaType(preference)}
                </Typography>
            ))}
          </Box>
          <Typography variant="body1" gutterBottom>
            <strong>Audience Details:</strong>
          </Typography>
          <Box sx={{ pl: 2 }}>
            {formData.audienceDetails.map((audience, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  <strong>Audience {index + 1} Name:</strong> {audience.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Audience {index + 1} ID Card Number:</strong> {audience.idCard}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <button className="button button-primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Next
        </button>
      </CardContent>
    </Card>
  );
};

export default Confirmation;