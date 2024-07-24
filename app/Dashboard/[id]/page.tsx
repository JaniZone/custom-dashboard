// pages/dashboard/[id].tsx
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Dashboard {
  id: number;
  name: string;
  link: string; // Add the link property
}

const dashboards: Dashboard[] = [
  { id: 1, name: "Sales Dashboard", link: "/page2" },
  { id: 2, name: "Marketing Dashboard", link: "/marketing-dashboard" },
  { id: 3, name: "HR Dashboard", link: "/hr-dashboard" },
];

const DashboardPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id); // Convert id to number

  const dashboard = dashboards.find((d) => d.id === dashboardId);

  if (!dashboard) {
    return <p>Dashboard not found</p>;
  }

  // Handle navigation to the link associated with the dashboard
  const handleNavigate = () => {
    if (dashboard.link) {
      router.push(dashboard.link);
    }
  };

  return (
    <div>
      <h1>{dashboard.name}</h1>
      <button onClick={handleNavigate}>Go to {dashboard.name}</button>
    </div>
  );
};

export default DashboardPage;
