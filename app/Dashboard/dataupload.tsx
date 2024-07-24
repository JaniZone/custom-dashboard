"use client";
import React, { useState } from "react";
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

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
  };

  const toggleTableDisplay = (index: number) => {
    setShowTables((prevShowTables) =>
      prevShowTables.map((show, i) => (i === index ? !show : show))
    );
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx,.xls"
        multiple
        onChange={handleFileUpload}
        className={styles.fileInput}
      />
      {filesData.length > 0 &&
        filesData.map((fileData, fileIndex) => (
          <div key={fileIndex} className={styles.container}>
            <h2>{fileData.name}</h2>
            <p>Status: {fileData.status}</p>
            <button
              onClick={() => toggleTableDisplay(fileIndex)}
              className={styles.button}
            >
              {showTables[fileIndex] ? "Hide Table" : "Show Table"}
            </button>
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
