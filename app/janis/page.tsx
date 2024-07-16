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
    { Country: 'India', Population: 140, colorField: 'India'},
    { Country: 'USA', Population: 33, colorField: 'USA' },
    { Country: 'Japan', Population: 12, colorField: 'Japan' },
    { Country: 'China', Population: 141, colorField: 'China' },
    { Country: 'Australia', Population: 2.6, colorField: 'Australia' },
  ];

  if (!chartLoaded) return null;

  const { Bar } = require('@ant-design/charts');

  const props = {
    data,
    xField: 'Country',
    yField: 'Population',
    colorField: 'colorField',
    barStyle: { fillOpacity: 0.6 },
  };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '60%' }}>
          <Bar {...props} />
        </div>
      </div>
    );
};

export default Page;
