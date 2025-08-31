import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Feedback = () => {
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/feedback/submit',
        { customerName, rating, comment },
        { headers: { 'Content-Type': 'application/json' } }
      );
      toast.success(data.message);
      // Clear the form
      setCustomerName('');
      setRating(5);
      setComment('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit feedback.');
    }
  };

  return (
    <section className="reservation" style={{ backgroundColor: '#f9fbf2' }}>
      <div className="container">
        <div className="banner">
          <div className="reservation_form_box">
            <h1>Leave Us Your Feedback</h1>
            <p>Your opinion is invaluable to us. Let us know how we did!</p>
            <form onSubmit={handleFeedbackSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div>
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  required
                  style={{ width: '100%', padding: '5px', fontSize: '16px', border: 'none', borderBottom: '1px solid #333', background: 'transparent' }}
                >
                  <option value={5}>★★★★★ (Excellent)</option>
                  <option value={4}>★★★★☆ (Great)</option>
                  <option value={3}>★★★☆☆ (Good)</option>
                  <option value={2}>★★☆☆☆ (Fair)</option>
                  <option value={1}>★☆☆☆☆ (Poor)</option>
                </select>
              </div>
              <div>
                <textarea
                  placeholder="Your comments..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows="4"
                  style={{ width: '100%', padding: '5px', fontSize: '16px', border: 'none', borderBottom: '1px solid #333', background: 'transparent' }}
                ></textarea>
              </div>
              <button type="submit">SUBMIT FEEDBACK</button>
            </form>
          </div>
        </div>
        <div className="banner">
          <img src="/whoweare.png" alt="feedback" />
        </div>
      </div>
    </section>
  );
};

export default Feedback;