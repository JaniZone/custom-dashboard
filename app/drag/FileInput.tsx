"use client";
import React, { useState, DragEvent, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import * as XLSX from "xlsx";
import styles from "../styles/dataupload.module.css";

interface FileData {
  name: string;
  data: any[][];
  status: string;
}

const FileInput: React.FC = () => {
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const [showTables, setShowTables] = useState<boolean[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        if (typeof binaryStr !== "string") return;

        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // @ts-ignore
        setFilesData((prevData) => [
          ...prevData,
          { name: file.name, data: sheetData, status: "Uploaded" },
        ]);
        setShowTables((prevShowTables) => [...prevShowTables, false]);
      };
      reader.readAsBinaryString(file);
    });

    // Reset the file input value to allow re-uploading the same file
    (document.getElementById("fileInput") as HTMLInputElement).value = "";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
    }
  };

  const toggleTableDisplay = (index: number) => {
    setShowTables((prevShowTables) =>
      prevShowTables.map((show, i) => (i === index ? !show : show))
    );
  };

  const handleInputClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleDeleteTable = (index: number) => {
    setFilesData((prevData) => prevData.filter((_, i) => i !== index));
    setShowTables((prevShowTables) =>
      prevShowTables.filter((_, i) => i !== index)
    );
  };
  console.log(filesData);
  return (
    <div className={styles.main}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleInputClick}
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ""}`}
      >
        <p>Drag and drop your Excel files here, or click to select files</p>
        <input
          id="fileInput"
          type="file"
          accept=".xlsx,.xls"
          multiple
          onChange={handleInputChange}
          className={styles.fileInput}
          style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} // Hide the file input element visually
        />
      </div>
      {filesData.length > 0 &&
        filesData.map((fileData, fileIndex) => (
          <div key={fileIndex} className={styles.container}>
            <div className={styles.fileInfo}>
              <h2 className={styles.fileName}>{fileData.name}</h2>
              <p>Status: {fileData.status}</p>
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => toggleTableDisplay(fileIndex)}
                className={styles.button}
              >
                {showTables[fileIndex] ? "Hide Table" : "Show Table"}
              </button>
              <button
                onClick={() => handleDeleteTable(fileIndex)}
                className={styles.deleteButton}
              >
                Delete Table
              </button>
            </div>
            {showTables[fileIndex] && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    {fileData.data[0].map((cell: any, index: number) => (
                      <th key={index}>{cell}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className={styles.body}>
                  {fileData.data
                    .slice(1)
                    .map((row: any[], rowIndex: number) => (
                      <tr key={rowIndex}>
                        {row.map((cell: any, cellIndex: number) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
    </div>
  );
};

export default dynamic(() => Promise.resolve(FileInput), { ssr: false });