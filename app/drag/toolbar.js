"use client";
import React from 'react';
import FileInput from './FileInput'; // Make sure this path is correct

const Toolbar = () => {
  return (
    <div style={{
      width: '250px',
      backgroundColor: '#f0f0f0',
      padding: '10px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      height: '100vh',
      overflowY: 'auto',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '1000'
    }}>
      <h2>Data Files</h2>
      <FileInput />
    </div>
  );
};

export default Toolbar;
