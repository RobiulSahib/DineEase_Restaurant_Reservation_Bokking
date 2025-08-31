


// // import React, { useState } from "react";
// // import { HiOutlineArrowNarrowRight } from "react-icons/hi";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import { useNavigate } from "react-router-dom";

// // const Reservation = () => {
// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [date, setDate] = useState("");
// //   const [time, setTime] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const navigate = useNavigate();

// //   const handleReservation = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const { data } = await axios.post(
// //         "http://localhost:4000/api/v1/reservation/send", // ✅ Corrected to match working backend port
// //         { firstName, lastName, email, phone, date, time },
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           withCredentials: true,
// //         }
// //       );

// //       toast.success(data.message);
// //       setFirstName("");
// //       setLastName("");
// //       setPhone("");
// //       setEmail("");
// //       setTime("");
// //       setDate("");
// //       navigate("/success");
// //     } catch (error) {
// //       console.log("Reservation error:", error);
// //       toast.error(error.response?.data?.message || "Something went wrong");
// //     }
// //   };

// //   return (
// //     <section className="reservation" id="reservation">
// //       <div className="container">
// //         <div className="banner">
// //           <img src="/reservation.png" alt="res" />
// //         </div>
// //         <div className="banner">
// //           <div className="reservation_form_box">
// //             <h1>MAKE A RESERVATION</h1>
// //             <p>For Further Questions, Please Call</p>
// //             <form onSubmit={handleReservation}>
// //               <div>
// //                 <input
// //                   type="text"
// //                   placeholder="First Name"
// //                   value={firstName}
// //                   onChange={(e) => setFirstName(e.target.value)}
// //                   required
// //                 />
// //                 <input
// //                   type="text"
// //                   placeholder="Last Name"
// //                   value={lastName}
// //                   onChange={(e) => setLastName(e.target.value)}
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <input
// //                   type="date"
// //                   value={date}
// //                   onChange={(e) => setDate(e.target.value)}
// //                   required
// //                 />
// //                 <input
// //                   type="time"
// //                   value={time}
// //                   onChange={(e) => setTime(e.target.value)}
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <input
// //                   type="email"
// //                   placeholder="Email"
// //                   className="email_tag"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   required
// //                 />
// //                 <input
// //                   type="tel"
// //                   placeholder="Phone"
// //                   value={phone}
// //                   onChange={(e) => setPhone(e.target.value)}
// //                   required
// //                 />
// //               </div>
// //               <button type="submit">
// //                 RESERVE NOW{" "}
// //                 <span>
// //                   <HiOutlineArrowNarrowRight />
// //                 </span>
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Reservation;





// import React, { useState } from "react";
// import { HiOutlineArrowNarrowRight } from "react-icons/hi";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Reservation = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [phone, setPhone] = useState("");
//   const [duration, setDuration] = useState(1); // 1. ADD DURATION STATE (default 1 hour)
//   const navigate = useNavigate();

//   const handleReservation = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/reservation/send",
//         // 2. SEND DURATION TO BACKEND
//         { firstName, lastName, email, phone, date, time, duration },
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       setFirstName("");
//       setLastName("");
//       setPhone("");
//       setEmail("");
//       setTime("");
//       setDate("");
//       setDuration(1); // Reset duration
//       navigate("/success");
//     } catch (error) {
//       console.log("Reservation error:", error);
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <section className="reservation" id="reservation">
//       <div className="container">
//         <div className="banner">
//           <img src="/reservation.png" alt="res" />
//         </div>
//         <div className="banner">
//           <div className="reservation_form_box">
//             <h1>MAKE A RESERVATION</h1>
//             <p>For Further Questions, Please Call</p>
//             <form onSubmit={handleReservation}>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <input
//                   type="date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="time"
//                   value={time}
//                   onChange={(e) => setTime(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   required
//                 />
//               </div>
//               {/* 3. ADD DURATION DROPDOWN */}
//               <div>
//                 <select 
//                   value={duration} 
//                   onChange={(e) => setDuration(parseInt(e.target.value))}
//                   style={{ width: '100%', padding: '5px', fontSize: '16px', border: 'none', borderBottom: '1px solid #333', background: 'transparent' }}
//                 >
//                   <option value={1}>1 Hour</option>
//                   <option value={2}>2 Hours</option>
//                   <option value={3}>3 Hours</option>
//                 </select>
//               </div>

//               <button type="submit">
//                 RESERVE NOW{" "}
//                 <span>
//                   <HiOutlineArrowNarrowRight />
//                 </span>
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Reservation;



// frontend/src/components/Reservation.jsx (Updated)
// import React, { useState } from "react";
// import { HiOutlineArrowNarrowRight } from "react-icons/hi";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../context/AppContext"; // 1. IMPORT CONTEXT

// const Reservation = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [phone, setPhone] = useState("");
//   const [duration, setDuration] = useState(1);
//   const navigate = useNavigate();
//   const { fetchReservations } = useAppContext(); // 2. GET THE FETCH FUNCTION

//   const handleReservation = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/reservation/send",
//         { firstName, lastName, email, phone, date, time, duration },
//         { headers: { "Content-Type": "application/json" }, withCredentials: true }
//       );
//       toast.success(data.message);
//       setFirstName("");
//       setLastName("");
//       setPhone("");
//       setEmail("");
//       setTime("");
//       setDate("");
//       setDuration(1);
//       fetchReservations(); // 3. RE-FETCH RESERVATIONS AFTER A NEW ONE IS ADDED
//       navigate("/success");
//     } catch (error) {
//       console.log("Reservation error:", error);
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <section className="reservation" id="reservation">
//       <div className="container">
//         <div className="banner">
//           <img src="/reservation.png" alt="res" />
//         </div>
//         <div className="banner">
//           <div className="reservation_form_box">
//             <h1>MAKE A RESERVATION</h1>
//             <p>For Further Questions, Please Call</p>
//             <form onSubmit={handleReservation}>
//               <div>
//                 <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
//                 <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
//               </div>
//               <div>
//                 <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//                 <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
//               </div>
//               <div>
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//               </div>
//               <div>
//                 <select 
//                   value={duration} 
//                   onChange={(e) => setDuration(parseInt(e.target.value))}
//                   style={{ width: '100%', padding: '5px', fontSize: '16px', border: 'none', borderBottom: '1px solid #333', background: 'transparent' }}
//                 >
//                   <option value={1}>1 Hour</option>
//                   <option value={2}>2 Hours</option>
//                   <option value={3}>3 Hours</option>
//                 </select>
//               </div>
//               <button type="submit">
//                 RESERVE NOW{" "}<span><HiOutlineArrowNarrowRight /></span>
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Reservation;

import React, { useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// We are NOT importing useAppContext for this test

const Reservation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");
  const [duration, setDuration] = useState(1);
  const navigate = useNavigate();
  
  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/reservation/send",
        { firstName, lastName, email, phone, date, time, duration },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      
      toast.success(data.message);
      
      // Clear the form
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setTime("");
      setDate("");
      setDuration(1);
      
      // THE CALL TO fetchReservations() HAS BEEN REMOVED
      
      navigate("/success");

    } catch (error) {
      // Improved error handling
      console.error("Full reservation error object:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="res" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For Further Questions, Please Call</p>
            <form onSubmit={handleReservation}>
              <div>
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
              <div>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div>
                <select 
                  value={duration} 
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  style={{ width: '100%', padding: '5px', fontSize: '16px', border: 'none', borderBottom: '1px solid #333', background: 'transparent' }}
                >
                  <option value={1}>1 Hour</option>
                  <option value={2}>2 Hours</option>
                  <option value={3}>3 Hours</option>
                </select>
              </div>
              <button type="submit">
                RESERVE NOW{" "}<span><HiOutlineArrowNarrowRight /></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;