// app/storedata/page.tsx
"use client";

import React, { useState } from 'react';
import { storage } from '../../app/firebaseConfig';
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const UploadJsonContent: React.FC = () => {
  const [url, setUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    try {
      const response = await fetch('/data.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      const jsonString = JSON.stringify(data);

      const storageRef = ref(storage, 'json/data.json');
      await uploadString(storageRef, jsonString, 'raw', {
        contentType: 'application/json',
      });

      const downloadURL = await getDownloadURL(storageRef);
      setUrl(downloadURL);
      alert(`File available at ${downloadURL}`);
    } catch (error) {
      console.error("Error uploading data: ", error);
      alert(`Error uploading data`);
    }
  };

  return (
    <div>
      <h1>Upload JSON Content to Firebase Storage</h1>
      <button onClick={handleUpload}>Upload JSON Content</button>
      {url && <p>File URL: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>}
    </div>
  );
};

export default UploadJsonContent;
