// import React from 'react';
// import { Navigate } from 'react-router-dom';

// // This component will be used to protect routes that require admin authentication.
// // For now, we will simulate the authentication status.
// // We will properly implement the context/logic for isAuthenticated later.

// const ProtectedRoute = ({ children }) => {
//   // In a real app, you would have a context or state management (like Redux)
//   // to check if the user is truly authenticated.
//   // For this sprint, we'll add a placeholder. The real logic will come later.
  
//   // Let's create a placeholder for authentication status.
//   // We'll assume the user is authenticated for now to test the structure.
//   // We will connect this to the real login status in a future step.
//   const isAuthenticated = false; // THIS IS A PLACEHOLDER FOR NOW

//   if (!isAuthenticated) {
//     // If the user is not authenticated, redirect them to the login page.
//     return <Navigate to="/login" />;
//   }

//   // If they are authenticated, render the component they were trying to access.
//   return children;
// };

// export default ProtectedRoute;



import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; // 1. IMPORT THE CONTEXT HOOK

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext(); // 2. GET THE REAL isAuthenticated VALUE

  if (!isAuthenticated) {
    // 3. If the user is NOT authenticated, redirect them to the login page.
    return <Navigate to="/login" />;
  }

  // If they are authenticated, render the component they were trying to access.
  return children;
};

export default ProtectedRoute;