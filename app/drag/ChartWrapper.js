// ChartWrapper.js

import React from 'react';
import BarChart from '@/components/bar-chart';
import PieChart from '@/components/pie-chart';
import ColumnChart from '@/components/column-chart';
import LineChart from '@/components/line-chart';
import AreaChart from '@/components/area-chart';
const ChartWrapper = ({ el, chartType, chartData }) => {
  
  switch (chartType[el.i]) {
    case 'PieChart':
      return <PieChart data={chartData[el.i]} height={el.h * 100} width={el.w * 100} />;
    case 'ColumnChart':
      return <ColumnChart data={chartData[el.i]} height={el.h * 100} width={el.w * 100} />;
    case 'LineChart':
        return <LineChart data={chartData[el.i]} height={el.h * 100} width={el.w * 100} />;
        case 'AreaChart':
          return <AreaChart data={chartData[el.i]} height={el.h * 100} width={el.w * 100} />;  
        default:
      return <BarChart data={chartData[el.i]} height={el.h * 100} width={el.w * 100} />;
  }
};

export default ChartWrapper;
