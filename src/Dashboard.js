import React from "react";

import FnFForm from "./FnFForm";

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to F&F Dashboard</h1>
        <button onClick={onLogout}>LOGOUT</button>
      </div>
      <FnFForm />
    </div>
  );
};

export default Dashboard;
