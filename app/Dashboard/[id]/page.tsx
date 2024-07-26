"use client";
// import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const id = 1;

const DashboardPage: FC = () => {
  // const router = useRouter();
  // const { id } = router.query;
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Load the dashboard from localStorage based on the name
      const dashboardData = localStorage.getItem(`dashboard_${id}`);
      if (dashboardData) {
        setDashboard(JSON.parse(dashboardData));
      } else {
        setDashboard(null); // Handle case where dashboard does not exist
      }
    }
  }, [id]);

  if (!dashboard) {
    return <p>Dashboard not found</p>;
  }

  return (
    <div>
      <h1>{dashboard.name}</h1>
      <img
        src={dashboard.thumbnail}
        alt={dashboard.name}
        style={{ width: "100px", height: "100px" }}
      />
      {/* Render your dashboard layout and items here */}
    </div>
  );
};

export default DashboardPage;
