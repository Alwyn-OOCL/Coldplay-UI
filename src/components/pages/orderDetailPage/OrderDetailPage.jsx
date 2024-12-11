import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, List, ListItem, ListItemText, Chip} from '@mui/material';
import { getOrderDetail } from '../../../api/pages/orderDetailApi';
import { refundTicket } from '../../../api/pages/orderDetailApi';
import ConfirmRefundDialog from './ConfirmRefundDialog';
import TicketCard from './TicketCard';
import ConcertDetail from './ConcertDetail';

const OrderDetailPage = () => {
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
  
    useEffect(() => {
      if (orderId) {
        getOrderDetail(orderId)
          .then(response => {
            if (response.data.success) {
              setOrderDetail(response.data.data);
            } else {
              setOrderDetail(null);
            }
          })
          .catch(error => {
            console.error('Error fetching order detail:', error);
            setOrderDetail(null);
          });
      }
    }, [orderId]);
  
    const handleOpenDialog = (ticketId) => {
      setSelectedTicketId(ticketId);
      setOpenDialog(true);
      document.getElementById('root').setAttribute('inert', 'true');
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedTicketId(null);
      document.getElementById('root').removeAttribute('inert');
    };
  
    const handleConfirmRefund = () => {
      if (selectedTicketId) {
        refundTicket(selectedTicketId)
          .then(response => {
            if (response.data.success) {
              setOrderDetail(prevDetail => ({
                ...prevDetail,
                tickets: prevDetail.tickets.map(ticket =>
                  ticket.ticketId === selectedTicketId ? { ...ticket, isRefunded: true } : ticket
                )
              }));
              handleCloseDialog();
            }
          })
          .catch(error => {
            console.error('Error refunding ticket:', error);
          });
      }
    };
  
    if (!orderDetail) {
      return (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h5" gutterBottom>
            Order Detail
          </Typography>
          <Typography variant="body1" color="textSecondary">
            No order detail available.
          </Typography>
        </Box>
      );
    }
  
    const totalAmount = orderDetail.tickets.length * orderDetail.areaPrice;
  
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Order Detail
        </Typography>
        <ConcertDetail orderDetail={orderDetail} totalAmount={totalAmount} />
        <Typography variant="h6" gutterBottom>
          Tickets
        </Typography>
        <List>
          {orderDetail.tickets.map((ticket, index) => (
            <ListItem key={ticket.ticketId} sx={{ padding: 0 }}>
              <TicketCard ticket={ticket} index={index} handleOpenDialog={handleOpenDialog} />
            </ListItem>
          ))}
        </List>
        <ConfirmRefundDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmRefund}
        />
      </Box>
    );
  };
  
  export default OrderDetailPage;