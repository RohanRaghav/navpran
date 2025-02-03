import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Statistic = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  // Numbers for the stats
  const stats = [
    { label: "Overall blood doonations", value: 5000 },
    { label: "At your Location", value: 12000 },
    { label: "Plasma donations", value: 8000 },
    { label: "Projects", value: 1500 },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) setStartAnimation(true);
    },
  });

  // Pie chart data
  const pieData = {
    labels: stats.map((stat) => stat.label),
    datasets: [
      {
        data: stats.map((stat) => stat.value),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const pieOptions = {
    maintainAspectRatio: false, // Allows resizing
  };

  return (
    <div
    className="statistics"
    >
      {/* Stats Section */}
      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "40px",
          padding:"20px",
          width: "60%",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{stat.label}</h3>
            <h2 className="stateh1">
              {startAnimation ? (
                <CountUp end={stat.value} duration={2} />
              ) : (
                0
              )}
            </h2>
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div
        style={{
            transform:'translate(50%,-10%)',
          width: "300px", // Set desired width for smaller chart
          height: "300px", // Set desired height for smaller chart
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Statistics Overview
        </h3>
        <Pie data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default Statistic;
