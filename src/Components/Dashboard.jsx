import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [dailyStats, setDailyStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const dailyChartRef = useRef(null);
  const monthlyChartRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "https://shortner-backend-c4dw.onrender.com/api/url/stats"
        );
        setDailyStats(response.data.dailyStats);
        setMonthlyStats(response.data.monthlyStats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">URLs Created Per Day</h4>
              <canvas ref={dailyChartRef}></canvas>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">URLs Created Per Month</h4>
              <canvas ref={monthlyChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
