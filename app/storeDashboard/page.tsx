// pages/index.tsx
"use client";
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";

// Define the structure of your JSON object here
interface DataItem {
  id: number;
  x: number;
  y: number;
  h: number;
  w: number;
}

interface DashboardData {
  id: string;
  name: string;
  thumbnail: string;
  data: DataItem[];
}

const storeDashboard = async (docName: string, dashboard: DashboardData) => {
  try {
    const docRef = doc(db, "Dashboard", docName);
    await setDoc(docRef, dashboard);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

const Home = () => {
  const [dashboard, setDashboard] = useState<DashboardData>({
    id: '',
    name: '',
    thumbnail: '',
    data: [],
  });
  const [dataItem, setDataItem] = useState<DataItem>({
    id: 0,
    x: 0,
    y: 0,
    h: 0,
    w: 0,
  });
  const [docName, setDocName] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleDashboardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDashboard(prevDashboard => ({
      ...prevDashboard,
      [name]: value,
    }));
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataItem(prevData => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleDocNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocName(e.target.value);
  };

  const addDataItem = () => {
    setDashboard(prevDashboard => ({
      ...prevDashboard,
      data: [...prevDashboard.data, dataItem],
    }));
    setDataItem({ id: 0, x: 0, y: 0, h: 0, w: 0 });
    setMessages(prevMessages => [...prevMessages, "Data item added successfully!"]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await storeDashboard(docName, dashboard);
      setDashboard({ id: '', name: '', thumbnail: '', data: [] });
      setDataItem({ id: 0, x: 0, y: 0, h: 0, w: 0 });
      setDocName('');
      setMessages(prevMessages => [...prevMessages, "Dashboard submitted successfully!"]);
    } catch (error) {
      setMessages(prevMessages => [...prevMessages, "Error submitting dashboard."]);
    }
  };

  return (
    <div>
      <h1>Store Dashboard in Firebase</h1>
      <form onSubmit={handleSubmit}>
        <h2>Dashboard Details</h2>
        <input
          type="text"
          placeholder="Document Name"
          value={docName}
          onChange={handleDocNameChange}
          required
        />
        <input
          type="text"
          name="id"
          placeholder="Dashboard ID"
          value={dashboard.id}
          onChange={handleDashboardChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Dashboard Name"
          value={dashboard.name}
          onChange={handleDashboardChange}
          required
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={dashboard.thumbnail}
          onChange={handleDashboardChange}
          required
        />
        <h3>Add Data Item</h3>
        <input
          type="number"
          name="id"
          placeholder="Data ID"
          value={dataItem.id}
          onChange={handleDataChange}
          required
        />
        <input
          type="number"
          name="x"
          placeholder="X"
          value={dataItem.x}
          onChange={handleDataChange}
          required
        />
        <input
          type="number"
          name="y"
          placeholder="Y"
          value={dataItem.y}
          onChange={handleDataChange}
          required
        />
        <input
          type="number"
          name="h"
          placeholder="H"
          value={dataItem.h}
          onChange={handleDataChange}
          required
        />
        <input
          type="number"
          name="w"
          placeholder="W"
          value={dataItem.w}
          onChange={handleDataChange}
          required
        />
        <button type="button" onClick={addDataItem}>Add Data Item</button>
        <button type="submit">Submit Dashboard</button>
      </form>
      {messages.length > 0 && (
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
