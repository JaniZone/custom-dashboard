"use client";
import React, { useState, useCallback, useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Modal from 'react-modal';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ChartWrapper from './ChartWrapper';
import Dropzone from './Dropzone';
import { buttonStyle, removeStyle, modalStyle, canvasContainerStyle, headerStyle, controlsStyle, selectStyle, inputStyle } from './styles';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
// import { useRouter } from 'next/router';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Dashboard = ({ onLayoutChange }) => {
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentWidget, setCurrentWidget] = useState(null);
  const [dashboardName, setDashboardName] = useState('');
  const [savedDashboards, setSavedDashboards] = useState([]);
  // const router = useRouter();

  useEffect(() => {
    // Load saved dashboards from localStorage
    const dashboards = Object.keys(localStorage).filter(key => key.startsWith('dashboard_'));
    setSavedDashboards(dashboards);
  }, []);

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

  const handleFileDrop = (id, files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const parsedData = data.slice(1).map((row) => ({
        Country: row[0],
        Population: row[1],
        colorField: row[2],
      }));
      setChartData((prevData) => ({
        ...prevData,
        [id]: parsedData,
      }));
      closeModal();
    };
    reader.readAsBinaryString(file);
  };

  const openModal = (id) => {
    setCurrentWidget(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentWidget(null);
  };

  const saveDashboard = async () => {
    if (dashboardName.trim() === "") {
      alert("Please enter a dashboard name.");
      return;
    }
  
    // Capture the canvas thumbnail
    const canvasElement = document.querySelector(".canvas-container");
    if (canvasElement) {
      const canvas = await html2canvas(canvasElement, {
        backgroundColor: null, // Ensure the background is transparent
      });
      const thumbnail = canvas.toDataURL("image/png");
  
      const dashboardState = {
        items,
        chartData,
        chartType,
        thumbnail,
        name: dashboardName, // Include the name in the state
      };
      localStorage.setItem(`dashboard_${dashboardName}`, JSON.stringify(dashboardState));
      alert('Dashboard saved!');
      setSavedDashboards([...savedDashboards, `dashboard_${dashboardName}`]);
      console.log(dashboardState);
    }
  };

  const loadDashboard = (name) => {
    const savedDashboard = localStorage.getItem(name);
    if (savedDashboard) {
      const { items, chartData, chartType } = JSON.parse(savedDashboard);
      setItems(items);
      setChartData(chartData);
      setChartType(chartType);
      setNewCounter(items.length); // Set newCounter to avoid ID conflicts
      setDashboardName(name.replace('dashboard_', ''));
    }
  };

  const deleteDashboard = (name) => {
    localStorage.removeItem(name);
    alert('Dashboard deleted!');
    setSavedDashboards(savedDashboards.filter(dashboard => dashboard !== name));
    setDashboardName(''); // Clear the dashboard name when deleting
  };

  const handleDashboardSelection = (event) => {
    const selectedDashboard = event.target.value;
    if (selectedDashboard) {
      // router.push(`/dashboard/${selectedDashboard}`);
    }
  };

  const createElement = (el) => {
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
        <ChartWrapper el={el} chartType={chartType} chartData={chartData} />
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
            style={selectStyle}
          >
            <option value="BarChart">Bar Chart</option>
            <option value="PieChart">Pie Chart</option>
            <option value="ColumnChart">Column Chart</option>
          </select>
          <button style={buttonStyle} onClick={() => openModal(el.i)}>Add Data</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="header" style={headerStyle}>
        <div className="controls" style={controlsStyle}>
          <button style={buttonStyle} onClick={onAddItem}>Add Item</button>
          <input
            type="text"
            placeholder="Dashboard Name"
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            style={inputStyle}
          />
          <button style={buttonStyle} onClick={saveDashboard}>Save Dashboard</button>
          <select onChange={handleDashboardSelection} style={selectStyle}>
            <option value="">Load Dashboard</option>
            {savedDashboards.map(dashboard => (
              <option key={dashboard} value={dashboard.replace('dashboard_', '')}>{dashboard.replace('dashboard_', '')}</option>
            ))}
          </select>
          <select onChange={(e) => deleteDashboard(e.target.value)} style={selectStyle}>
            <option value="">Delete Dashboard</option>
            {savedDashboards.map(dashboard => (
              <option key={dashboard} value={dashboard}>{dashboard.replace('dashboard_', '')}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="canvas-container" style={canvasContainerStyle}>
        <ResponsiveReactGridLayout
          onLayoutChange={handleLayoutChange}
          onBreakpointChange={onBreakpointChange}
          className="layout"
          rowHeight={100}
          cols={cols}
        >
          {items.map((el) => createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Data"
        style={modalStyle}
      >
        <h2>Add Data</h2>
        <button style={{ ...buttonStyle, background: "#e74c3c" }} onClick={closeModal}>Close</button>
        <Dropzone currentWidget={currentWidget} handleFileDrop={handleFileDrop} />
      </Modal>
    </div>
  );
};

export default Dashboard;

