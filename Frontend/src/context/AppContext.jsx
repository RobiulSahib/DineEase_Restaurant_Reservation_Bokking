import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Function to handle admin login
  const adminLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role: "admin" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setUser(data.user);
      return true; // Return true on successful login
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      return false; // Return false on failed login
    }
  };

  // Function to handle admin logout
  const adminLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success("Logged out successfully!");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
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