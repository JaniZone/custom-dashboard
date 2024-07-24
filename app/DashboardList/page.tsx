import { FC } from "react";
import Link from "next/link";
import styles from "../styles/dashboardlist.module.css"; // Assuming you have a CSS module for styling

interface Dashboard {
  id: number;
  name: string;
  thumbnail: string;
  link: string; // Add link property
}

const dashboards: Dashboard[] = [
  {
    id: 1,
    name: "Sales Dashboard",
    thumbnail:
      "https://images.shiksha.com/mediadata/shikshaOnline/mailers/2022/naukri-learning/what-is/What-is-sales.jpg",
    link: "/page2",
  },
  {
    id: 2,
    name: "Marketing Dashboard",
    thumbnail:
      "https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/marketing-pillar-page-marketing-overview_0.png",
    link: "/marketing-dashboard",
  },
  {
    id: 3,
    name: "HR Dashboard",
    thumbnail: "https://etimg.etb2bimg.com/photo/100365193.cms",
    link: "/hr-dashboard",
  },
];

const DashboardList: FC = () => {
  return (
    <div className={styles.dashboardhead}>
      <h1>Dashboard List</h1>
      <div className={styles.dashboardGrid}>
        {dashboards.map((dashboard) => (
          <Link
            key={dashboard.id}
            href={dashboard.link}
            className="p-4 bg-white shadow-md rounded-lg"
          >
            <div className="flex justify-center">
              <img
                src={dashboard.thumbnail}
                alt={dashboard.name}
                // className={styles.thumbnail}
                className="rounded-lg h-20"
              />
            </div>
            <div className="font-semibold mt-4 mb-2 flex justify-center">
              {dashboard.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardList;
