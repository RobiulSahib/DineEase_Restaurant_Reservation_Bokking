// // import React, { createContext, useState, useContext } from "react";
// // import axios from "axios";
// // import toast from "react-hot-toast";

// // export const AppContext = createContext();

// // export const AppProvider = ({ children }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [user, setUser] = useState(null);

// //   // Function to handle admin login
// //   const adminLogin = async (email, password) => {
// //     try {
// //       const { data } = await axios.post(
// //         "http://localhost:4000/api/v1/user/login",
// //         { email, password, role: "admin" },
// //         {
// //           withCredentials: true,
// //           headers: { "Content-Type": "application/json" },
// //         }
// //       );
// //       toast.success(data.message);
// //       setIsAuthenticated(true);
// //       setUser(data.user);
// //       return true; // Return true on successful login
// //     } catch (error) {
// //       toast.error(error.response.data.message);
// //       setIsAuthenticated(false);
// //       return false; // Return false on failed login
// //     }
// //   };

// //   // Function to handle admin logout
// //   const adminLogout = async () => {
// //     try {
// //       await axios.get("http://localhost:4000/api/v1/user/logout", {
// //         withCredentials: true,
// //       });
// //       toast.success("Logged out successfully!");
// //       setIsAuthenticated(false);
// //       setUser(null);
// //     } catch (error) {
// //       toast.error(error.response.data.message);
// //     }
// //   };

// //   return (
// //     <AppContext.Provider
// //       value={{
// //         isAuthenticated,
// //         user,
// //         adminLogin,
// //         adminLogout,
// //       }}
// //     >
// //       {children}
// //     </AppContext.Provider>
// //   );
// // };

// // export const useAppContext = () => {
// //   return useContext(AppContext);
// // };


// import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   // --- START: STATE CHANGES ---
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     sessionStorage.getItem("isAuthenticated") === "true" // 1. Check sessionStorage on initial load
//   );
//   const [user, setUser] = useState(null);
//   const [reservations, setReservations] = useState([]); // 2. Add reservations state here
//   // --- END: STATE CHANGES ---

//   // 3. CREATE A FUNCTION TO FETCH RESERVATIONS
//   const fetchReservations = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:4000/api/v1/reservation/getall",
//         { withCredentials: true }
//       );
//       setReservations(data.reservations);
//     } catch (error) {
//       // Don't show an error toast here, as this will run on other pages too
//       // The dashboard will handle showing an error if needed.
//     }
//   };

//   const adminLogin = async (email, password) => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/user/login",
//         { email, password, role: "admin" },
//         { withCredentials: true, headers: { "Content-Type": "application/json" } }
//       );
//       toast.success(data.message);
//       setIsAuthenticated(true);
//       sessionStorage.setItem("isAuthenticated", "true"); // 4. Save login state
//       setUser(data.user);
//       return true;
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setIsAuthenticated(false);
//       return false;
//     }
//   };

//   const adminLogout = async () => {
//     try {
//       await axios.get("http://localhost:4000/api/v1/user/logout", {
//         withCredentials: true,
//       });
//       toast.success("Logged out successfully!");
//       setIsAuthenticated(false);
//       sessionStorage.removeItem("isAuthenticated"); // 5. Clear login state
//       setUser(null);
//       setReservations([]); // Clear reservations on logout
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   // 6. Automatically fetch reservations if authenticated
//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchReservations();
//     }
//   }, [isAuthenticated]);


//   return (
//     <AppContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//         reservations, // 7. Provide reservations and the fetch function
//         fetchReservations,
//         adminLogin,
//         adminLogout,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   return useContext(AppContext);
// };


import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/reservation/getall",
        { withCredentials: true }
      );
      setReservations(data.reservations);
    } catch (error) {
      // Silently fail is okay here
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role: "admin" },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true");
      setUser(data.user);
      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      return false;
    }
  };

  const adminLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success("Logged out successfully!");
      setIsAuthenticated(false);
      sessionStorage.removeItem("isAuthenticated");
      setUser(null);
      setReservations([]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchReservations();
    }
  }, [isAuthenticated]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        reservations,
        fetchReservations,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};