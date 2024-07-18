"use client";
import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import BarChart from '@/components/bar-chart';
import PieChart from '@/components/pie-chart';
import ColumnChart from '@/components/column-chart';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ComplexInterfaceGrid = () => {
  const [layout, setLayout] = useState([
    { i: '1', x: 0, y: 0, w: 2, h: 4 },
    // More widgets can be added here
  ]);

  const [data, setData] = useState([
    {
      id: '1',
      chartType: 'bar',
      chartData: [
        { type: 'A', value: 30 },
        { type: 'B', value: 20 },
        { type: 'C', value: 50 },
      ],
    },
    // Add data for more widgets here
  ]);

  const [inputData, setInputData] = useState({
    chartType: 'bar',
    chartData: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const newId = `${layout.length + 1}`;
    const newWidget = { i: newId, x: 0, y: Infinity, w: 2, h: 4 };
    setLayout([...layout, newWidget]);

    const chartDataArray = inputData.chartData.split(',').map((item) => {
      const [type, value] = item.split(':');
      return { type, value: parseFloat(value) };
    });

    const newData = {
      id: newId,
      chartType: inputData.chartType,
      chartData: chartDataArray,
    };
    setData([...data, newData]);

    setInputData({ chartType: 'bar', chartData: '' }); // Reset form
  };

  const removeWidget = (i: string) => {
    setLayout(layout.filter((item) => item.i !== i));
    setData(data.filter((item) => item.id !== i));
  };

  // const getChartComponent = (chartType: string, chartData: { type: string; value: number; }[]) => {
  //   switch (chartType) {
  //     case 'bar':
  //       return <BarChart data={chartData} />;
  //     case 'pie':
  //       return <PieChart data={chartData} />;
  //     case 'column':
  //       return <ColumnChart data={chartData} />;
  //     default:
  //       return null;
    // }
  // };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Chart Type:
          <select name="chartType" value={inputData.chartType} onChange={handleInputChange}>
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
            <option value="column">Column</option>
          </select>
        </label>
        <label>
          Data (format: type:value,type:value):
          <input
            type="text"
            name="chartData"
            value={inputData.chartData}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Widget</button>
      </form>
      <GridLayout
        className="complex-interface-layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {layout.map((item) => {
          const widgetData = data.find((d) => d.id === item.i);
          return (
            <div key={item.i} className="grid-item">
              <div className="grid-item-header">
                {`Widget ${item.i}`}
                <button
                  className="remove-widget-btn"
                  onClick={() => removeWidget(item.i)}
                >
                  X
                </button>
              </div>
              <div className="chart-container">
                {/* {widgetData && getChartComponent(widgetData.chartType, widgetData.chartData)} */}
              </div>
            </div>
          );
        })}
      </GridLayout>
      <style jsx>{`
        .add-widget-btn {
          margin-bottom: 10px;
          padding: 10px;
          background-color: #00796b;
          color: white;
          border: none;
          cursor: pointer;
        }

        .grid-item {
          background: #fff;
          border: 1px solid #ddd;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          color: black;
          padding: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .grid-item-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #009688;
          color: white;
          padding: 5px;
          border-bottom: 1px solid #00796b;
        }

        .remove-widget-btn {
          background: red;
          color: white;
          border: none;
          cursor: pointer;
        }

        .chart-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chart-container > div {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default ComplexInterfaceGrid;
