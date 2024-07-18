"use client";
import React, { useState, useCallback } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
//import * as XLSX from 'xlsx';
import BarChart from '@/components/bar-chart';
import PieChart from '@/components/pie-chart';
import ColumnChart from '@/components/column-chart';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const AddRemoveLayout = ({ onLayoutChange }) => {
  const [items, setItems] = useState([]);
  const [newCounter, setNewCounter] = useState(0);
  const [cols, setCols] = useState({
    lg: 12,
    md: 10,
    sm: 6,
    xs: 4,
    xxs: 2,
  });
  const [chartData, setChartData] = useState({});
  const [chartType, setChartType] = useState({});

  const onAddItem = useCallback(() => {
    const newItemId = `n${newCounter}`;
    setItems((prevItems) => [
      ...prevItems,
      {
        i: newItemId,
        x: (prevItems.length * 2) % (cols.lg || 12),
        y: Infinity,
        w: 4,
        h: 4,
      },
    ]);
    setNewCounter((prevCounter) => prevCounter + 1);
    setChartData((prevData) => ({
      ...prevData,
      [newItemId]: [],
    }));
    setChartType((prevType) => ({
      ...prevType,
      [newItemId]: "BarChart",
    }));
  }, [newCounter, cols]);

  const onRemoveItem = useCallback((i) => {
    setItems((prevItems) => prevItems.filter(item => item.i !== i));
    setChartData((prevData) => {
      const newData = { ...prevData };
      delete newData[i];
      return newData;
    });
    setChartType((prevType) => {
      const newType = { ...prevType };
      delete newType[i];
      return newType;
    });
  }, []);

  const onBreakpointChange = useCallback((breakpoint, newCols) => {
    setCols(newCols);
  }, []);

  const handleLayoutChange = useCallback(
    (layout) => {
      setItems(layout);
      if (onLayoutChange) {
        onLayoutChange(layout);
      }
    },
    [onLayoutChange]
  );

  const handleChartTypeChange = (id, type) => {
    setChartType((prevType) => ({
      ...prevType,
      [id]: type,
    }));
  };

 
  const chartComponent = (el) => {
    switch (chartType[el.i]) {
      case 'PieChart':
        return <PieChart data={chartData[el.i]} height={el.h * 100} width={el.w * 100} />;
      case 'ColumnChart':
        return <ColumnChart data={chartData[el.i]} height={el.h * 100} width={el.w * 100} />;
      default:
        return <BarChart data={chartData[el.i]} height={el.h * 100} width={el.w * 100} />;
    }
  };

  const createElement = (el) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: "2px",
      cursor: "pointer",
      color: "#fff",
      background: "#e74c3c",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    return (
      <div
        key={el.i}
        data-grid={{ ...el }}
        style={{
          border: "1px solid #ddd",
          backgroundColor: "#fff",
          color: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          position: "relative",
        }}
      >
        <span className="text">{el.i}</span>
        {chartComponent(el)}
        <span
          className="remove"
          style={removeStyle}
          onClick={() => onRemoveItem(el.i)}
        >
          x
        </span>
        <div style={{ marginTop: "10px" }}>
          <select
           value={chartType[el.i]}
            onChange={(e) => handleChartTypeChange(el.i, e.target.value)}
          >
            <option value="BarChart">Bar Chart</option>
            <option value="PieChart">Pie Chart</option>
            <option value="ColumnChart">Column Chart</option>
          </select>
          {/* <input
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => handleFileUpload(el.i, e.target.files[0])}
          /> */}
        </div>
      </div>
    );
  };

  return (
    <div>
      <button onClick={onAddItem}>Add Item</button>
      <ResponsiveReactGridLayout
        onLayoutChange={handleLayoutChange}
        onBreakpointChange={onBreakpointChange}
        className="layout"
        cols={cols}
        rowHeight={100}
      >
        {items.map((el) => createElement(el))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default AddRemoveLayout;


 // const handleFileUpload = (id, file) => {
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const binaryStr = e.target.result;
  //     const workbook = XLSX.read(binaryStr, { type: 'binary' });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  //     const parsedData = data.slice(1).map((row) => ({
  //       type: row[0],
  //       value: row[1],
  //     }));
  //     setChartData((prevData) => ({
  //       ...prevData,
  //       [id]: parsedData,
  //     }));
  //   };
  //   reader.readAsBinaryString(file);
  // };


import Image from "next/image";
  <Image width={100} height={100} src={"https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"} />
      //<FileUpload setDatasrc={setDatasrc} />
     //h <Drag datasrc={datasrc} />