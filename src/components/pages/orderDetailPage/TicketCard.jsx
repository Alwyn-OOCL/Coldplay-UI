import { Box, Card, CardContent, Chip, ListItemText } from "@mui/material";
import React from "react";

const TicketCard = ({ ticket, index, handleOpenDialog }) => {
  return (
    <Card sx={{ width: "100%", marginBottom: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ListItemText
          primary={`Audience ${index + 1}: ${ticket.audienceName}`}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {ticket.isRefunded ? (
            <Chip label="Refunded" color="success" />
          ) : (
            <button
              className="button button-primary"
              onClick={() => handleOpenDialog(ticket.ticketId)}
            >
              Refund
            </button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
