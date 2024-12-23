import { Box, Card, CardContent, Chip, ListItemText } from '@mui/material';
import React from 'react';

const TicketCard = ({ ticket, index, handleOpenDialog, concertStartTime }) => {
  const startTime = new Date(concertStartTime);
  const currentTime = new Date();
  console.log(concertStartTime);
  console.log(startTime, currentTime);
  console.log(startTime < currentTime);

  return (
    <Card sx={{ width: '100%', marginBottom: 2 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ListItemText
          primary={`Audience ${index + 1}: ${ticket.audienceName}`}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {ticket.isRefunded ? (
            <Chip label="Refunded" color="success" />
          ) : (
            currentTime < startTime && (
              <button className="button button-primary" onClick={() => handleOpenDialog(ticket.ticketId)}>
                Refund
              </button>
            )
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TicketCard;