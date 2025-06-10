"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface Dashboard {
  name: string;
  thumbnail: string;
  // Add other properties if needed
}

const DashboardPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);

  useEffect(() => {
    if (id && typeof id === "string") {
      const dashboardData = localStorage.getItem(`dashboard_${id}`);
      if (dashboardData) {
        setDashboard(JSON.parse(dashboardData));
      } else {
        router.push(`/DashboardList`); // Redirect to home or an error page
      }
    }
  }, [id]);

  if (!dashboard) return <div>Loading...</div>;

  return (
    <div>
      <h1>{dashboard.name}</h1>
      <img src={dashboard.thumbnail} alt={dashboard.name} />
      {/* Render other dashboard details here */}
    </div>
  );
};

export default DashboardPage;
