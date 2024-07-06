import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
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

  const dailyData = {
    labels: dailyStats.map((stat) => stat._id),
    datasets: [
      {
        label: "URLs Created Per Day",
        data: dailyStats.map((stat) => stat.count),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const monthlyData = {
    labels: monthlyStats.map((stat) => stat._id),
    datasets: [
      {
        label: "URLs Created Per Month",
        data: monthlyStats.map((stat) => stat.count),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">URLs Created Per Day</h4>
              <Line data={dailyData} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">URLs Created Per Month</h4>
              <Line data={monthlyData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
