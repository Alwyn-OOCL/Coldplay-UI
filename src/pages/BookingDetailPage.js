import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './BookingDetailPage.css';

// Example data - replace with actual API call
// todo remove mock data Edmond
const mockOrderDetail = {
    success: true,
    data: {
        "order.orderId": 1,
        "concert.concertName": "Taylor Swift: The Eras Tour",
        "concert.image": "/placeholder.svg?height=400&width=400",
        "concert.startTime": "2024-03-15T19:00:00",
        "concert.duration": 3,
        "concert.description": "Experience Taylor Swift's record-breaking Eras Tour live!",
        "venue.country": "United States",
        "venue.city": "Los Angeles",
        "venue.address": "SoFi Stadium, 1001 Stadium Dr",
        "area.area_type": "VIP",
        "area.area_price": 450,
        "order.bookingTime": "2023-12-10T14:30:00",
        tickets: [
            {
                "ticket.ticketId": 1,
                "ticket.audience_name": "John Doe",
                "ticket.is_refunded": false
            },
            {
                "ticket.ticketId": 2,
                "ticket.audience_name": "Jane Doe",
                "ticket.is_refunded": true
            }
        ]
    }
};

export default function BookingDetailPage() {
    const { orderId } = useParams();
    const { data } = mockOrderDetail;

    const handleRefund = (ticketId) => {
        console.log(`Refunding ticket ${ticketId}`);
        // Implement refund logic here
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="booking-detail-page">
            <main className="container">
                <div className="booking-content">
                    <div className="booking-header">
                        {/* Section 1: Concert Poster */}
                        <section className="poster-section">
                            <img
                                src={data["concert.image"]}
                                alt={data["concert.concertName"]}
                                className="concert-poster"
                            />
                        </section>

                        {/* Section 2: Concert Details */}
                        <section className="details-section">
                            <h1>{data["concert.concertName"]}</h1>
                            <div className="details-list">
                                <div className="detail-row">
                                    <span>Date & Time:</span>
                                    <span>{formatDate(data["concert.startTime"])}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Duration:</span>
                                    <span>{data["concert.duration"]} hours</span>
                                </div>
                                <div className="detail-row">
                                    <span>Venue:</span>
                                    <span>{data["venue.address"]}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Location:</span>
                                    <span>{data["venue.city"]}, {data["venue.country"]}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Area Type:</span>
                                    <span>{data["area.area_type"]}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Price:</span>
                                    <span>${data["area.area_price"]}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Booking Time:</span>
                                    <span>{formatDate(data["order.bookingTime"])}</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Section 3: Tickets */}
                    <section className="tickets-section">
                        {data.tickets.map((ticket) => (
                            <div key={ticket["ticket.ticketId"]} className="ticket-row">
                                <div className="ticket-number">
                                    Ticket #{ticket["ticket.ticketId"]}
                                </div>
                                <div className="ticket-holder">
                                    {ticket["ticket.audience_name"]}
                                </div>
                                <div className="ticket-status">
                  <span className={`status-badge ${ticket["ticket.is_refunded"] ? 'refunded' : 'paid'}`}>
                    {ticket["ticket.is_refunded"] ? 'Refunded' : 'Paid'}
                  </span>
                                    {!ticket["ticket.is_refunded"] && (
                                        <button
                                            className="refund-button"
                                            onClick={() => handleRefund(ticket["ticket.ticketId"])}
                                        >
                                            Refund
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </div>
    );
}

