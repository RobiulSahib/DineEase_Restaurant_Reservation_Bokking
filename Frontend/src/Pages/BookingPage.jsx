import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BookingPage = () => {
  const { bookingId } = useParams(); // Get the bookingId from the URL
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/reservation/public/get/${bookingId}` // We will create this public API endpoint next
        );
        setReservation(data.reservation);
        setLoading(false);
      } catch (error) {
        toast.error("Booking not found or has been cancelled.");
        setLoading(false);
        navigate("/");
      }
    };
    fetchBooking();
  }, [bookingId, navigate]);

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      try {
        const { data } = await axios.delete(
          `http://localhost:4000/api/v1/reservation/public/cancel/${bookingId}` // We will create this public cancel endpoint next
        );
        toast.success(data.message);
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not cancel booking.");
      }
    }
  };

  if (loading) {
    return <h1 style={{ paddingTop: '150px', textAlign: 'center' }}>Loading Your Booking...</h1>;
  }

  if (!reservation) {
    return (
        <section className="notFound" style={{ paddingTop: '100px' }}>
            <div className="container">
                <h1>Booking Not Found</h1>
                <p>This booking may have been cancelled or the link is invalid.</p>
                <Link to={"/"}>Back to Home</Link>
            </div>
      </section>
    );
  }

  return (
    <section className="reservation" style={{ paddingTop: '100px', minHeight: '100vh', justifyContent: 'flex-start' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>Your Reservation</h1>
            <p>Here are the details for your booking. Please contact us if you need to make any changes.</p>
            <div style={{ textAlign: 'left', margin: '2rem 0' }}>
              <p><strong>Name:</strong> {reservation.firstName} {reservation.lastName}</p>
              <p><strong>Date:</strong> {reservation.date}</p>
              <p><strong>Time:</strong> {reservation.time}</p>
              <p><strong>Duration:</strong> {reservation.duration} hour(s)</p>
            </div>
            <button className="deleteBtn" onClick={handleCancel} style={{ backgroundColor: '#c0392b', color: 'white' }}>
              CANCEL RESERVATION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;