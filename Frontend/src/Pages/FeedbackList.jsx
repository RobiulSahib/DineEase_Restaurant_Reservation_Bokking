import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/v1/feedback/getall',
          { withCredentials: true }
        );
        setFeedbackList(data.feedback);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch feedback.');
        setFeedbackList([]);
      }
    };
    fetchFeedback();
  }, []);

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section className="dashboard page" style={{ padding: '100px 20px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="banner" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
          <h1>Customer Feedback</h1>
          <Link to="/dashboard" style={{ textDecoration: 'underline' }}>
            &larr; Back to Reservations
          </Link>
        </div>
        
        {feedbackList && feedbackList.length > 0 ? (
          <div className="feedback-container" style={{ width: '100%' }}>
            {feedbackList.map((item) => (
              <div key={item._id} className="feedback-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>{item.customerName}</h3>
                  <span style={{ color: '#f5c518', fontSize: '1.2rem' }}>{renderStars(item.rating)}</span>
                </div>
                <p style={{ margin: 0, color: '#555' }}>"{item.comment}"</p>
                <p style={{ margin: '1rem 0 0', fontSize: '0.8rem', color: '#999', textAlign: 'right' }}>
                  Submitted on: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No feedback has been submitted yet.</p>
        )}
      </div>
    </section>
  );
};

export default FeedbackList;