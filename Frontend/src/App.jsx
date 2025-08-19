// import React from 'react'
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import Home from './Pages/Home/Home';
// import NotFound from './Pages/NotFound/NotFound';
// import Success from './Pages/Success/Success';
// import './App.css'
// const App = () => {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path='/' element={<Home/>}/>
//           <Route path='/success' element={<Success/>}/>
//           <Route path='*' element={<NotFound/>}/>
//         </Routes>
//         <Toaster/>
//       </Router>
//     </>
//   )
// }

// export default App



// frontend/src/App.jsx

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Home from "./Pages/Home/Home";
// import NotFound from "./Pages/NotFound/NotFound";
// import Success from "./Pages/Success/Success";
// import AdminLogin from "./pages/AdminLogin"; // 1. Import AdminLogin
// import Dashboard from "./pages/Dashboard";   // 2. Import Dashboard
// import "./App.css";

// const App = () => {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/success" element={<Success />} />
//           <Route path="/login" element={<AdminLogin />} />     {/* 3. Add Login Route */}
//           <Route path="/dashboard" element={<Dashboard />} /> {/* 4. Add Dashboard Route */}
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
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute"; // 1. IMPORT THE NEW COMPONENT

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<AdminLogin />} />
          
          {/* 2. UPDATE THE DASHBOARD ROUTE */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;