import React, { useState } from "react";
import { controlsContainerStyle, buttonStyle } from './styles';

const DashboardControls = ({ onAddItem, saveDashboard, loadDashboard, setDashboardName, deleteDashboard }) => {
  const [dashboardToDelete, setDashboardToDelete] = useState("");

  const getSavedDashboards = () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('dashboard_'));
    return keys.map(key => key.replace('dashboard_', ''));
  };

  const handleDelete = () => {
    if (dashboardToDelete) {
      deleteDashboard(`dashboard_${dashboardToDelete}`);
      setDashboardToDelete("");
    }
  };

  return (
    <div style={controlsContainerStyle}>
      <button style={buttonStyle} onClick={onAddItem}>Add Item</button>
      <input
        type="text"
        placeholder="Dashboard Name"
        onChange={(e) => setDashboardName(e.target.value)}
      />
      <button style={buttonStyle} onClick={saveDashboard}>Save Dashboard</button>
      <select onChange={(e) => loadDashboard(`dashboard_${e.target.value}`)}>
        <option value="">Load Dashboard</option>
        {getSavedDashboards().map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <select value={dashboardToDelete} onChange={(e) => setDashboardToDelete(e.target.value)}>
        <option value="">Select Dashboard to Delete</option>
        {getSavedDashboards().map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <button style={buttonStyle} onClick={handleDelete} disabled={!dashboardToDelete}>Delete Dashboard</button>
    </div>
  );
};

export default DashboardControls;
