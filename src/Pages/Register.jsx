import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  //const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { username, email, password };
    await axios
      .post(
        "http://localhost:5000/api/user/register-user",
        payload
      )
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
    setemail("");
    setPassword("");
    setUserName("");
  };

  return (
    <div>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <strong>Register User</strong>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
