

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import { AppProvider } from './context/AppContext.jsx';
// import "react-big-calendar/lib/css/react-big-calendar.css"; // 1. ADD THIS LINE

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AppProvider>
//       <App />
//     </AppProvider>
//   </React.StrictMode>,
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import "react-big-calendar/lib/css/react-big-calendar.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  // --- REMOVE THE <React.StrictMode> TAGS ---
  // <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  // </React.StrictMode>
);