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
    { country: 'India', Population: 140, colorField:'India' },
    { country: 'USA', Population: 33, colorField:'USA' },
    { country: 'Japan', Population: 12, colorField:'Japan' },
    { country: 'China', Population: 141, colorField:'China' },
    { country: 'Australia', Population: 2.6, colorField:'Austrslia' }
  ];


  if (!chartLoaded) return null;

  const { Column } = require('@ant-design/charts');

  const props = {
    data,
    xField: 'country',
    yField: 'Population',
    colorField:'colorField',
    columnStyle: {
    fillOpacity: 0.8,
    }
  };

  return < Column {...props} />;
};

export default Page;

