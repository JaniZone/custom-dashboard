"use client";
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

const Column = dynamic(() => import("@ant-design/charts").then(mode => mode.Column), {ssr: false})
const ColumnChart = ({ data=[] ,height = 300, width = 300}) => {
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load Ant Design Charts library when component mounts
    import('@ant-design/charts').then(() => {
      setChartLoaded(true);
    });
  }, []);


  if (!chartLoaded) return null;

  const { Column } = require('@ant-design/charts');

  const props = {
    data,
    xField: 'Country',
    yField: 'Population',
    colorField: 'Country',
    columnStyle: {fillOpacity: 0.8,},
    padding: 50,
    autoFit: true,
    width,
    height
  };

  return <>
    <Column {...props} />
  </>
};

export default ColumnChart;

