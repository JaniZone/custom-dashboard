"use client";
import React, { useState, useCallback, useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Modal from 'react-modal';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ChartWrapper from './ChartWrapper';
import Toolbar from './toolbar'; // Import the Toolbar
import Dropzone from './Dropzone';
import { buttonStyle, removeStyle, modalStyle, canvasContainerStyle, headerStyle, controlsStyle, selectStyle, inputStyle, downloadLinkStyle } from './styles';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';  // Import the uuid library
import './styles.css'; // Import your styles

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Dashboard = ({ onLayoutChange }) => {
  const router = useRouter();

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
  const [currentDashboardId, setCurrentDashboardId] = useState(null);

  useEffect(() => {
    // Load saved dashboards from localStorage
    const dashboards = Object.keys(localStorage).filter(key => key.startsWith('dashboard_'));
    setSavedDashboards(dashboards.map(key => ({
      id: key,
      name: JSON.parse(localStorage.getItem(key)).name
    })));
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

      const dashboardId =currentDashboardId || uuidv4();
      // Generate a unique ID for the dashboard
      const dashboardState = {
        id: dashboardId,
        name: dashboardName,
        items,
        chartData,
        chartType,
        thumbnail,
      };
      localStorage.setItem(`dashboard_${dashboardId}`, JSON.stringify(dashboardState));
      setCurrentDashboardId(dashboardId);
      alert('Dashboard saved!');
      router.push(`/Dashboard/${dashboardId}`);
      //setSavedDashboards([...savedDashboards, { id: `dashboard_${dashboardId}`, name: dashboardName }]);
    }
  };

  const loadDashboard = (id) => {
    const savedDashboard = localStorage.getItem(id);
    if (savedDashboard) {
      const { items, chartData, chartType, name } = JSON.parse(savedDashboard);
      setItems(items);
      setChartData(chartData);
      setChartType(chartType);
      setNewCounter(items.length); // Set newCounter to avoid ID conflicts
      setDashboardName(name); // Set the dashboard name
      setCurrentDashboardId(id);
    }
  };

  const deleteDashboard = (id) => {
    localStorage.removeItem(id);
    alert('Dashboard deleted!');
    setSavedDashboards(savedDashboards.filter(dashboard => dashboard.id !== id));
    setDashboardName(''); // Clear the dashboard name when deleting
    if (currentDashboardId === id) setCurrentDashboardId(null);
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
    <div style={{ display: 'flex' }}>
      <Toolbar /> {/* Add the Toolbar here */}
      <div style={{ marginLeft: '250px', flex: 1 }}>
        <div className="header" style={headerStyle}>
          <div className="controls" style={controlsStyle}>
            <button style={buttonStyle} onClick={onAddItem}>Add Widget</button>
            <input
              type="text"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              placeholder="Enter dashboard name"
              style={inputStyle}
            />
            <button style={buttonStyle} onClick={saveDashboard}>Save Dashboard</button>
          <select onChange={(e) => loadDashboard(e.target.value)} style={selectStyle}>
            <option value="">Load Dashboard</option>
            {savedDashboards.map(dashboard => (
              <option key={dashboard.id} value={dashboard.id}>{dashboard.name}</option>
            ))}
          </select>
          <select onChange={(e) => deleteDashboard(e.target.value)} style={selectStyle}>
            <option value="">Delete Dashboard</option>
            {savedDashboards.map(dashboard => (
              <option key={dashboard.id} value={dashboard.id}>{dashboard.name}</option>
            ))}
          </select>
        </div>
      </div>
        <div className="canvas-container" style={canvasContainerStyle}>
          <ResponsiveReactGridLayout
            className="layout"
            layouts={{ lg: items }}
            onLayoutChange={handleLayoutChange}
            onBreakpointChange={onBreakpointChange}
          >
            {items.map((item) => createElement(item))}
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
        <a href="/sample-data.xlsx" download style={{ marginTop: "10px", display: "block", color: "#3498db" }}>
          Download Sample Data File
        </a>
      </Modal>
    </div>
    </div>
  );
};

export default Dashboard;