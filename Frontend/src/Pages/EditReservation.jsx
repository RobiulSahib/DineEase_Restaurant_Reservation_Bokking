import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const EditReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchReservations } = useAppContext();

  const [reservation, setReservation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    duration: 1,
  });

  useEffect(() => {
    const fetchSingleReservation = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/reservation/get/${id}`,
          { withCredentials: true }
        );
        // Ensure date is in 'YYYY-MM-DD' format for the input field
        const formattedDate = data.reservation.date.split('T')[0];
        setReservation({ ...data.reservation, date: formattedDate });
      } catch (error) {
        toast.error("Failed to fetch reservation details.");
        navigate("/dashboard");
      }
    };
    fetchSingleReservation();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/reservation/update/${id}`,
        reservation,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      toast.success(data.message);
      fetchReservations();
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Network Error: Could not connect to the server.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  if (!reservation.firstName) { // Check for a specific field to prevent rendering an empty form
    return <h1 style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</h1>;
  }

  return (
    <section className="reservation" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <div className="banner">
          <div className="reservation_form_box">
            <h1>EDIT RESERVATION</h1>
            <p>Update the details for the booking.</p>
            <form onSubmit={handleUpdate}>
              <div>
                <input type="text" name="firstName" placeholder="First Name" value={reservation.firstName} onChange={handleInputChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={reservation.lastName} onChange={handleInputChange} required />
              </div>
              <div>
                <input type="date" name="date" value={reservation.date} onChange={handleInputChange} required />
                <input type="time" name="time" value={reservation.time} onChange={handleInputChange} required />
              </div>
              <div>
                <input type="email" name="email" placeholder="Email" value={reservation.email} onChange={handleInputChange} required />
                <input type="tel" name="phone" placeholder="Phone" value={reservation.phone} onChange={handleInputChange} required />
              </div>
              <div>
                <select 
                  name="duration"
                  value={reservation.duration} 
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '5px', fontSize: '16px', border: 'none', borderBottom: '1px solid #333', background: 'transparent' }}
                >
                  <option value={1}>1 Hour</option>
                  <option value={2}>2 Hours</option>
                  <option value={3}>3 Hours</option>
                </select>
              </div>
              <button type="submit">UPDATE RESERVATION</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditReservation;