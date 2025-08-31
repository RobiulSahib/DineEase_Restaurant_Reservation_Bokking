// import React from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import { useAppContext } from '../context/AppContext';
// import { Link } from 'react-router-dom';

// const localizer = momentLocalizer(moment);

// const CalendarView = () => {
//   const { reservations } = useAppContext();

//   // Format the reservation data into events for the calendar
//   const events = reservations.map(res => {
//     const startTime = moment(`${res.date} ${res.time}`, 'YYYY-MM-DD HH:mm').toDate();
//     const endTime = moment(startTime).add(res.duration, 'hours').toDate();

//     return {
//       title: `${res.firstName} ${res.lastName} (${res.phone})`,
//       start: startTime,
//       end: endTime,
//       resource: res, // Attach the original reservation object for potential future use
//     };
//   });

//   return (
//     <section className="dashboard page" style={{ padding: '100px 20px' }}>
//       <div className="container" style={{ maxWidth: '1200px' }}>
//         <div className="banner" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
//           <h1>Reservation Calendar</h1>
//           <Link to="/dashboard" style={{ textDecoration: 'underline' }}>
//             &larr; Back to List View
//           </Link>
//         </div>
        
//         <div style={{ height: '70vh', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: '100%' }}
//             views={['month', 'week', 'day']} // Allow different views
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CalendarView;

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { reservations } = useAppContext();

  // Format the real reservation data into events for the calendar
  const events = reservations.map(res => {
    const startTime = moment(`${res.date} ${res.time}`, 'YYYY-MM-DD HH:mm').toDate();
    const endTime = moment(startTime).add(res.duration, 'hours').toDate();

    return {
      title: `${res.firstName} ${res.lastName} (${res.phone})`,
      start: startTime,
      end: endTime,
      resource: res,
    };
  });

  return (
    <section className="dashboard page" style={{ padding: '100px 20px' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="banner" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
          <h1>Reservation Calendar</h1>
          <Link to="/dashboard" style={{ textDecoration: 'underline' }}>
            &larr; Back to List View
          </Link>
        </div>
        
        <div style={{ height: '70vh', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            views={['month', 'week', 'day']}
          />
        </div>
      </div>
    </section>
  );
};

export default CalendarView;