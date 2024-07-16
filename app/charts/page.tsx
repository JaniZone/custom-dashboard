"use client";
// pages/page.tsx
import React from 'react';
import styles from './page.module.css';
import BarChart from '@/components/bar-chart';
import PieChart from '@/components/pie-chart';
import ColumnChart from '@/components/column-chart';

// import ColumnChart from '@ant-design/plots/es/components/column';



const Page: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>My Charts</h1>
      <div className={styles.chart}>
        <h2>Bar Chart</h2>
        <BarChart />
      </div>
      <div className={styles.chart}>
        <h2>Pie Chart</h2>
        <PieChart />
      </div>
      <div className={styles.chart}>
        <h2>Column Chart</h2>
        <ColumnChart />
      </div>
    </div>
  );
};

export default Page;
