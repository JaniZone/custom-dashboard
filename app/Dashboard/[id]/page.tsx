import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Dashboard {
  name: string;
  thumbnail: string;
  // Add other properties if needed
}

const DashboardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);

  useEffect(() => {
    
    if (id && typeof id === 'string') {
      const dashboardData = localStorage.getItem(`dashboard_${id}`);
      if (dashboardData) {
        setDashboard(JSON.parse(dashboardData));
      } else {
        router.push('/'); // Redirect to home or an error page
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

