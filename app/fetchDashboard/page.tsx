// pages/fetch.tsx
"use client";
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

const FetchData = () => {
  const [docName, setDocName] = useState<string>('');
  const [dashboard, setDashboard] = useState<any>(null); // Using `any` type for simplicity
  const [message, setMessage] = useState<string>('');

  const handleDocNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocName(e.target.value);
  };

  const fetchDashboard = async () => {
    try {
      const docRef = doc(db, "Dashboard", docName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDashboard(docSnap.data());
        setMessage("Document fetched successfully!");
      } else {
        setDashboard(null);
        setMessage("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      setMessage("Error fetching document.");
    }
  };

  return (
    <div>
      <h1>Fetch Dashboard from Firebase</h1>
      <input
        type="text"
        placeholder="Enter Document Name"
        value={docName}
        onChange={handleDocNameChange}
        required
      />
      <button type="button" onClick={fetchDashboard}>Fetch Document</button>
      {message && <p>{message}</p>}
      {dashboard && (
        <div>
          <h2>Dashboard Details</h2>
          <p><strong>ID:</strong> {dashboard.id}</p>
          <p><strong>Name:</strong> {dashboard.name}</p>
          <p><strong>Thumbnail:</strong> {dashboard.thumbnail}</p>
          <h3>Data Items:</h3>
          <ul>
            {dashboard.data.map((item: any, index: number) => (
              <li key={index}>
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>X:</strong> {item.x}</p>
                <p><strong>Y:</strong> {item.y}</p>
                <p><strong>Height:</strong> {item.h}</p>
                <p><strong>Width:</strong> {item.w}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchData;
