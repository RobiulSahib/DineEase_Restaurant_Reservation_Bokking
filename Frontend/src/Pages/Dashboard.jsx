// // frontend/src/pages/Dashboard.jsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     const fetchReservations = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/reservation/getall",
//           { withCredentials: true }
//         );
//         setReservations(data.reservations);
//       } catch (error) {
//         toast.error(error.response.data.message);
//       }
//     };
//     fetchReservations();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const { data } = await axios.delete(
//         `http://localhost:4000/api/v1/reservation/delete/${id}`,
//         { withCredentials: true }
//       );
//       toast.success(data.message);
//       // Remove the deleted reservation from the state
//       setReservations(reservations.filter(res => res._id !== id));
//     } catch (error) {
//        toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <section className="dashboard page">
//       <div className="container">
//         <h1>All Reservations</h1>
//         {reservations.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reservations.map((res) => (
//                 <tr key={res._id}>
//                   <td>{`${res.firstName} ${res.lastName}`}</td>
//                   <td>{res.email}</td>
//                   <td>{res.phone}</td>
//                   <td>{res.date}</td>
//                   <td>{res.time}</td>
//                   <td><button onClick={() => handleDelete(res._id)}>Delete</button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No reservations found.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext"; // 1. IMPORT THE CONTEXT HOOK

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  const { adminLogout } = useAppContext(); // 2. GET THE adminLogout FUNCTION

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/reservation/getall",
          { withCredentials: true }
        );
        setReservations(data.reservations);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/reservation/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setReservations(reservations.filter((res) => res._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // 3. CREATE THE LOGOUT HANDLER
  const handleLogout = () => {
    adminLogout(); // Call the function from context
    navigate("/login"); // Redirect to login page
  };

  return (
    <section className="dashboard page">
      <div className="container">
        {/* 4. ADD A BANNER FOR THE TITLE AND LOGOUT BUTTON */}
        <div className="banner">
          <h1>All Reservations</h1>
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        {reservations.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res._id}>
                  <td>{`${res.firstName} ${res.lastName}`}</td>
                  <td>{res.email}</td>
                  <td>{res.phone}</td>
                  <td>{res.date}</td>
                  <td>{res.time}</td>
                  <td>
                    <button onClick={() => handleDelete(res._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;