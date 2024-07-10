"use client";
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
    { type: '1991', value: 3 },
    { type: '1992', value: 4 },
    { type: '1993', value: 3.5 },
    { type: '1994', value: 5 },
    { type: '1995', value: 4.9 },
    { type: '1996', value: 6 },
    { type: '1997', value: 7 },
    { type: '1998', value: 9 },
    { type: '1999', value: 13 },
  ];

  if (!chartLoaded) return null;

  const { Pie } = require('@ant-design/charts');

  const props = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
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
      '#6DC8EC',
      '#9270CA',
      '#FF9D4D',
      '#269A99',
      '#FF99C3',
    ],
  };

  return <Pie {...props} />;
};

export default Page;
