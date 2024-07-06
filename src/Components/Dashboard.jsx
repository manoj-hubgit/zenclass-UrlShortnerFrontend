import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  useEffect(() => {
    if (dailyStats.length > 0) {
      const ctx = dailyChartRef.current.getContext("2d");
      new ChartJS(ctx, {
        type: "line",
        data: {
          labels: dailyStats.map((stat) => stat._id),
          datasets: [
            {
              label: "URLs Created Per Day",
              data: dailyStats.map((stat) => stat.count),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      });
    }
  }, [dailyStats]);

  useEffect(() => {
    if (monthlyStats.length > 0) {
      const ctx = monthlyChartRef.current.getContext("2d");
      new ChartJS(ctx, {
        type: "line",
        data: {
          labels: monthlyStats.map((stat) => stat._id),
          datasets: [
            {
              label: "URLs Created Per Month",
              data: monthlyStats.map((stat) => stat.count),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
      });
    }
  }, [monthlyStats]);

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
