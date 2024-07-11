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
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  if (!chartLoaded) return null;

  const { Column } = require('@ant-design/charts');

  const props = {
    data,
    xField: 'year',
    yField: 'value',
    columnStyle: {
      fillOpacity: 0.8,
    },
  };

  return < Column {...props} />;
};

export default Page;

