// pages/index.tsx
"use client";
import { useState } from 'react';
import { db } from '../../app/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

// Define the structure of your JSON object here
interface MyData {
  name: string;
  age: number;
}

const storeData = async (data: MyData) => {
  try {
    const docRef = await addDoc(collection(db, "details"), data);
    console.log("Document written with ID: ", docRef.id);
    alert("Document written to collection");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const Home = () => {
  const [data, setData] = useState<MyData>({ name: '', age: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await storeData(data);
  };

  return (
    <div>
      <h1>Store Data in Firebase</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={data.age}
          onChange={(e) => setData({ ...data, age: parseInt(e.target.value) })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
