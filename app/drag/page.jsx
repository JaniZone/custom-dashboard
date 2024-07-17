"use client";
import React, { useState, useCallback } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import 'react-grid-layout/css/styles.css'; // Ensure to import the necessary CSS
import 'react-resizable/css/styles.css';  // For resizable handles

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const AddRemoveLayout = ({ onLayoutChange }) => {
  const [items, setItems] = useState(
    [0, 1, 2, 3, 4].map((i) => ({
      i: i.toString(),
      x: i * 2,
      y: 0,
      w: 2,
      h: 2,
    }))
  );
  const [newCounter, setNewCounter] = useState(0);
  const [breakpoint, setBreakpoint] = useState(null);
  const [cols, setCols] = useState({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 });

  const onAddItem = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      {
        i: "n" + newCounter,
        x: (prevItems.length * 2) % (cols.lg || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
      },
    ]);
    setNewCounter((prevCounter) => prevCounter + 1);
  }, [newCounter, cols]);

  const onRemoveItem = useCallback((i) => {
    console.log("Removing item with ID:", i); // Log the ID being removed
    setItems((prevItems) => _.reject(prevItems, { i }));
  }, []);

  const onBreakpointChange = useCallback((breakpoint, cols) => {
    setBreakpoint(breakpoint);
    setCols(cols);
  }, []);

  const handleLayoutChange = useCallback(
    (layout) => {
      if (onLayoutChange) {
        onLayoutChange(layout);
      }
    },
    [onLayoutChange]
  );

  const createElement = useCallback(
    (el) => {
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
          data-grid={el}
          style={{
            border: "1px solid #ddd",
            backgroundColor: el.i % 2 === 0 ? "#3498db" : "#2ecc71",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            position: "relative",
          }}
        >
          <span className="text">{el.i}</span>
          <span
            className="remove"
            style={removeStyle}
            onClick={() => onRemoveItem(el.i)} // Pass the correct ID
          >
            x
          </span>
        </div>
      );
    },
    [onRemoveItem]
  );

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
