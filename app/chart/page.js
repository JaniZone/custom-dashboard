"use client";
import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // 

const ChartDisplay = () => {
    const [chartType, setChartType] = useState('bar');
    const [data, setData] = useState([10, 20, 30, 40, 50]);
    const [labels, setLabels] = useState(['Red', 'Blue', 'Yellow', 'Green', 'Purple']);
    
    const handleChartTypeChange = (e) => setChartType(e.target.value);
    const handleDataChange = (e) => setData(e.target.value.split(',').number());
    const handleLabelsChange = (e) => setLabels(e.target.value.split(','));

    const chartData = {
        labels,
        datasets: [{
            label: 'Sample Data',
            data,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return <Bar data={chartData} options={chartOptions} />;
            case 'line':
                return <Line data={chartData} options={chartOptions} />;
            case 'pie':
                return <Pie data={chartData} />;
            default:
                return null;
        }
    };

    return (
        <div className="chart-display" style={{ width: '80%', maxWidth: '800px', margin: 'auto' }}>
            <h2>Chart Display</h2>
            <div>
                <label>
                    Chart Type:
                    <select value={chartType} onChange={handleChartTypeChange}>
                        <option value="bar">Bar</option>
                        <option value="line">Line</option>
                        <option value="pie">Pie</option>
                        <option value="no chart">no chart</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Data (comma-separated):
                    <input type="text" value={data} onChange={handleDataChange} />
                </label>
            </div>
            <div>
                <label>
                    Labels (comma-separated):
                    <input type="text" value={labels} onChange={handleLabelsChange} />
                </label>
            </div>
            {renderChart()}
        </div>
    );
};

export default ChartDisplay;
