"use client";
import PieChart from '@/components/pie-chart';
import React, { useEffect, useState } from 'react';

const Page: React.FC = () => {
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load Ant Design Charts library when component mounts
    import('@ant-design/charts').then(() => {
      setChartLoaded(true);
    });
  }, []);

  const data = [
    { country: 'India', population: 70 },
    { country: 'US', population: 60 },
    { country: 'Japan', population: 80},
    { country: 'China', population: 90 },
    {country: 'Austrailia',population: 50 },
    
  ];

  if (!chartLoaded) return null;

  const { Pie } = require('@ant-design/charts');

  const props = {
    appendPadding: 10,
    data,
    angleField: 'population',
    colorField: 'country',
    radius: 1,
   
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
    color: [
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#E8684A',
      
    ],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '60%' }}>
        <Pie {...props} />
        </div>
      </div>
    
  ) 
};

export default Page;
