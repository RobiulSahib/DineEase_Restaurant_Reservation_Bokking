

// import React from "react";
// // --- THIS IS THE MISSING LINE ---
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // ---------------------------------
// import { Toaster } from "react-hot-toast";
// import Home from "./Pages/Home/Home";
// import NotFound from "./Pages/NotFound/NotFound";
// import Success from "./Pages/Success/Success";
// import AdminLogin from "./pages/AdminLogin";
// import Dashboard from "./pages/Dashboard";
// import EditReservation from "./pages/EditReservation";
// import FeedbackList from "./pages/FeedbackList";
// import "./App.css";
// import ProtectedRoute from "./components/ProtectedRoute";

// const App = () => {
//   return (
//     <>
//       <Router>
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/success" element={<Success />} />
//           <Route path="/login" element={<AdminLogin />} />
          
//           {/* --- PROTECTED ADMIN ROUTES --- */}
//           <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//           <Route path="/reservation/edit/:id" element={<ProtectedRoute><EditReservation /></ProtectedRoute>} />
//           <Route path="/feedback" element={<ProtectedRoute><FeedbackList /></ProtectedRoute>} />
          
//           {/* --- FALLBACK ROUTE --- */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//         <Toaster />
//       </Router>
//     </>
//   );
// };

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Success from "./Pages/Success/Success";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import EditReservation from "./pages/EditReservation";
import FeedbackList from "./pages/FeedbackList";
import CalendarView from "./pages/CalendarView";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<AdminLogin />} />
          
          {/* --- PROTECTED ADMIN ROUTES --- */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/reservation/edit/:id" element={<ProtectedRoute><EditReservation /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><FeedbackList /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarView /></ProtectedRoute>} />
          
          {/* --- FALLBACK ROUTE --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;