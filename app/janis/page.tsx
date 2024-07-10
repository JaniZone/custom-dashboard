"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Bar component with SSR disabled
const Bar = dynamic(() => import('@ant-design/charts').then(mod => mod.Bar), { ssr: false });

const Page: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will only run on the client side
    setIsClient(true);
  }, []);

  const data = [
    { Country: 'India', Population: 140, colorField: 'India'},
    { Country: 'USA', Population: 33, colorField: 'USA' },
    { Country: 'Japan', Population: 12, colorField: 'Japan' },
    { Country: 'China', Population: 141, colorField: 'China' },
    { Country: 'Australia', Population: 2.6, colorField: 'Australia' },
  ];

  const props = {
    data,
    xField: 'Country',
    yField: 'Population',
    colorField: 'colorField',
    barStyle: { fillOpacity: 0.6 }, // Optional: Adjust opacity if needed
  };

  // Render the chart only on the client side
  return isClient ? <Bar {...props} /> : null;
};

export default Page;
