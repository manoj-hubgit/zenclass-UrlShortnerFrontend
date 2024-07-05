import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setToken}) => {
    const [email,setemail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const payload={email,password}
    const handleSubmit= async (e)=>{
        e.preventDefault()
        await axios.post('https://shortner-backend-c4dw.onrender.com/api/user/login-user',payload)
        .then((res)=>{toast.success(res.data.message);
            setToken(res.data.token);
            navigate("/urlshortner")
        })
        .catch((error)=>{
            console.log(error)
            toast.error(error.response.data.message)
        })
        setemail('')
        setPassword('')
        }
    return (
        <div>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
            <strong>Login User</strong>
         
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
              onChange={(e)=>setemail(e.target.value)}
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
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
         
        </form> 

            <Link to='/forget-password' style={{ fontSize: '0.8rem', display: 'inline-block',}}>Forget Password?</Link>
      </div>
    </div>
    );
};

export default Login;