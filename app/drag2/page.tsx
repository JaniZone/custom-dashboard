"use client";
import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';

const ComplexInterfaceGrid = () => {
  const [layout, setLayout] = useState([
    { i: '1', x: 0, y: 0, w: 2, h: 4 },
    // More widgets can be added here
  ]);

  const addWidget = () => {
    const newWidget = { i: `${layout.length + 1}`, x: 0, y: Infinity, w: 2, h: 4 };
    setLayout([...layout, newWidget]);
  };

  const removeWidget = (i: string) => {
    setLayout(layout.filter((item) => item.i !== i));
  };


  return (
    <div>
      <button onClick={addWidget}>Add Widget</button>
      <GridLayout
        className="complex-interface-layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {layout.map((item) => (
          <div key={item.i} style={{ background: '#009688', position: 'relative' }}>
            {`Widget ${item.i}`}
            <button
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => removeWidget(item.i)}
            >
              X
            </button>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default ComplexInterfaceGrid;
