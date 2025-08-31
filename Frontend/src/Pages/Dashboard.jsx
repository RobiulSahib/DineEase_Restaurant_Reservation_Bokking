// // import React from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { useAppContext } from "../context/AppContext";
// // import axios from "axios";
// // import toast from "react-hot-toast";

// // const Dashboard = () => {
// //   const navigate = useNavigate();
// //   const { adminLogout, reservations, fetchReservations } = useAppContext();

// //   const handleDelete = async (id) => {
// //     try {
// //       const { data } = await axios.delete(
// //         `http://localhost:4000/api/v1/reservation/delete/${id}`,
// //         { withCredentials: true }
// //       );
// //       toast.success(data.message);
// //       fetchReservations();
// //     } catch (error) {
// //       toast.error(error.response.data.message);
// //     }
// //   };

// //   const handleLogout = () => {
// //     adminLogout();
// //     navigate("/login");
// //   };

// //   return (
// //     <section className="dashboard page">
// //       <div className="container">
// //         <div className="banner" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
// //           <h1>All Reservations</h1>
// //           <div>
// //             <Link to="/feedback" style={{ marginRight: '1.5rem', textDecoration: 'underline', color: '#333' }}>
// //               View Feedback
// //             </Link>
// //             <button className="logoutBtn" onClick={handleLogout}>Logout</button>
// //           </div>
// //         </div>

// //         {/* --- THIS IS THE MISSING TABLE CODE --- */}
// //         {reservations && reservations.length > 0 ? (
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>Name</th>
// //                 <th>Email</th>
// //                 <th>Phone</th>
// //                 <th>Date</th>
// //                 <th>Time</th>
// //                 <th>Duration</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {reservations.map((res) => (
// //                 <tr key={res._id}>
// //                   <td>{`${res.firstName} ${res.lastName}`}</td>
// //                   <td>{res.email}</td>
// //                   <td>{res.phone}</td>
// //                   <td>{res.date}</td>
// //                   <td>{res.time}</td>
// //                   <td>{`${res.duration} hr(s)`}</td>
// //                   <td>
// //                     <Link to={`/reservation/edit/${res._id}`} className="editBtn">Edit</Link>
// //                     <button onClick={() => handleDelete(res._id)}>Delete</button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           <p>No reservations found.</p>
// //         )}
// //         {/* --- END OF MISSING TABLE CODE --- */}

// //       </div>
// //     </section>
// //   );
// // };

// // export default Dashboard;


// import React from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAppContext } from "../context/AppContext";
// import axios from "axios";
// import toast from "react-hot-toast";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const { adminLogout, reservations, fetchReservations } = useAppContext();

//   const handleDelete = async (id) => {
//     try {
//       const { data } = await axios.delete(
//         `http://localhost:4000/api/v1/reservation/delete/${id}`,
//         { withCredentials: true }
//       );
//       toast.success(data.message);
//       fetchReservations();
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const handleLogout = () => {
//     adminLogout();
//     navigate("/login");
//   };

//   return (
//     <section className="dashboard page">
//       <div className="container">
//         <div className="banner" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
//           <h1>All Reservations</h1>
//           <div>
//             <Link to="/feedback" style={{ marginRight: '1.5rem', textDecoration: 'underline', color: '#333' }}>
//               View Feedback
//             </Link>
//             <Link to="/calendar" style={{ marginRight: '1.5rem', textDecoration: 'underline', color: '#333' }}>
//               Calendar View
//             </Link>
//             <button className="logoutBtn" onClick={handleLogout}>Logout</button>
//           </div>
//         </div>

//         {reservations && reservations.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Duration</th>
//                 <th>Actions</th>
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
//                   <td>{`${res.duration} hr(s)`}</td>
//                   <td>
//                     <Link to={`/reservation/edit/${res._id}`} className="editBtn">Edit</Link>
//                     <button onClick={() => handleDelete(res._id)}>Delete</button>
//                   </td>
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


import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { adminLogout, reservations, fetchReservations } = useAppContext();

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/reservation/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      fetchReservations();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate("/login");
  };

  return (
    <section className="dashboard page">
      <div className="container">
        <div className="banner" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <h1>All Reservations</h1>
          <div>
            <Link to="/feedback" style={{ marginRight: '1.5rem', textDecoration: 'underline', color: '#333' }}>
              View Feedback
            </Link>
            <Link to="/calendar" style={{ marginRight: '1.5rem', textDecoration: 'underline', color: '#333' }}>
              Calendar View
            </Link>
            <button className="logoutBtn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {reservations && reservations.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Actions</th>
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
                  <td>{`${res.duration} hr(s)`}</td>
                  <td>
                    <Link to={`/reservation/edit/${res._id}`} className="editBtn">Edit</Link>
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