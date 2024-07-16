'use client'
import React from 'react';
import { db } from '../../app/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

const StoreData: React.FC = () => {
  const handleStoreData = async () => {
    try {
      const response = await fetch('./data.json');
      const data = await response.json();

      await addDoc(collection(db, 'users'), data);
      alert('Data stored successfully');
    } catch (error) {
      console.error("Error storing data: ", error);
      alert('Error storing data');
    }
  };

  return (
    <button onClick={handleStoreData}>click to store</button>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <h1>Store Data in Firebase</h1>
      <StoreData />
    </div>
  );
};

export default Home;

