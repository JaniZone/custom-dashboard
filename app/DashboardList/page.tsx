"use client";
import { useEffect, useState, FC } from "react";
import Link from "next/link";
import styles from "../styles/dashboardlist.module.css";

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

  // Correct place to use useEffect
  useEffect(() => {
    // Load saved dashboards from localStorage
    const savedDashboards = Object.keys(localStorage)
      .filter((key) => key.startsWith("dashboard_"))
      .map((key) => JSON.parse(localStorage.getItem(key) || "{}"))
      .map((dashboard: any) => ({
        id: dashboard.id,
        name: dashboard.name,
        thumbnail: dashboard.thumbnail,
        link: `/Dashboard/${dashboard.id.replace("dashboard_", "")}`
, // Use id as a number
      }));

    setDashboards(savedDashboards);
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleDeleteDashboard = () => {
    if (selectedDashboardToDelete) {
      // Remove the dashboard from localStorage
      localStorage.removeItem(`dashboard_${selectedDashboardToDelete}`);

      // Remove the dashboard from state
      setDashboards((prevDashboards) =>
        prevDashboards.filter(
          (dashboard) => dashboard.id.toString() !== selectedDashboardToDelete // Ensure id comparison is correct
        )
      );

      setSelectedDashboardToDelete(""); // Clear selected item
      alert("Dashboard deleted!");

      // Optionally, re-fetch dashboards to ensure the list is up-to-date
      // (This will be redundant as we already filter out the deleted item from state)
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
            <option key={dashboard.id} value={dashboard.id.toString()}>
              {" "}
              {/* Convert id to string */}
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
