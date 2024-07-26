"use client";

import React, { useEffect, useState, FC } from "react";
import Link from "next/link";
import styles from "../styles/dashboardlist.module.css"; // Assuming you have a CSS module for styling

interface Dashboard {
  id: number;
  name: string;
  thumbnail: string;
  link: string;
}

const DashboardList: FC = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [selectedDashboardToDelete, setSelectedDashboardToDelete] =
    useState<string>("");

  useEffect(() => {
    // Load saved dashboards from localStorage
    const savedDashboards = Object.keys(localStorage)
      .filter((key) => key.startsWith("dashboard_"))
      .map((key) => JSON.parse(localStorage.getItem(key) || "{}"))
      .map((dashboard: any) => ({
        id: dashboard.id,
        name: dashboard.name,
        thumbnail: dashboard.thumbnail,
        link: `/Dashboard/${dashboard.name}`, // Generate link dynamically
      }));

    setDashboards(savedDashboards);
  }, []);

  const handleDeleteDashboard = () => {
    if (selectedDashboardToDelete) {
      localStorage.removeItem(`dashboard_${selectedDashboardToDelete}`);
      setDashboards(
        dashboards.filter(
          (dashboard) => dashboard.name !== selectedDashboardToDelete
        )
      );
      setSelectedDashboardToDelete(""); // Clear selected item
      alert("Dashboard deleted!");
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.header}>Dashboard List</h1>

      {/* Button to navigate to the Add Dashboard Page */}
      <Link href="/drag" className={styles.addButton}>
        Add Dashboard
      </Link>

      {/* Dropdown for deleting dashboard */}
      <div className={styles.dropdownContainer}>
        <select
          value={selectedDashboardToDelete}
          onChange={(e) => setSelectedDashboardToDelete(e.target.value)}
          className={styles.dropdown}
        >
          <option value="">Select Dashboard to Delete</option>
          {dashboards.map((dashboard) => (
            <option key={dashboard.id} value={dashboard.name}>
              {dashboard.name}
            </option>
          ))}
        </select>
        <button onClick={handleDeleteDashboard} className={styles.deleteButton}>
          Delete Selected Dashboard
        </button>
      </div>

      <div className={styles.dashboardGrid}>
        {dashboards.length === 0 ? (
          <p>No dashboards available. Click "Add Dashboard" to create one.</p>
        ) : (
          dashboards.map((dashboard) => (
            <Link
              key={dashboard.id}
              href={dashboard.link}
              className={styles.dashboardWidget}
            >
              <img
                src={dashboard.thumbnail}
                alt={dashboard.name}
                className={styles.thumbnail}
              />
              <div className={styles.dashboardName}>{dashboard.name}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardList;
