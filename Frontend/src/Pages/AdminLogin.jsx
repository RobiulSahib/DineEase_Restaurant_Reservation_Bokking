import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { adminLogin } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await adminLogin(email, password);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <section className="login">
      <div className="container">
        <div className="banner">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              // THIS IS THE CORRECTED LINE:
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;