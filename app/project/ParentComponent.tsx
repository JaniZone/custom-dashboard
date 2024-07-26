"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
// import FileInput from "./FileInput";

interface FileData {
  name: string;
  data: any[][];
  status: string;
}

const ParentComponent: React.FC = () => {
  const [filesData, setFilesData] = useState<FileData[]>([]);

  const handleFilesDataChange = (newFilesData: FileData[]) => {
    setFilesData(newFilesData);
  };

  return (
    <div>
      {/* {<FileInput onFilesDataChange={handleFilesDataChange} />} */}
      {filesData.length > 0 && (
        <div>
          <h1>Files Data:</h1>
          {filesData.map((file, index) => (
            <div key={index}>
              <h2>{file.name}</h2>
              <table>
                <thead>
                  <tr>
                    {file.data[0].map((cell: any, cellIndex: number) => (
                      <th key={cellIndex}>{cell}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {file.data.slice(1).map((row: any[], rowIndex: number) => (
                    <tr key={rowIndex}>
                      {row.map((cell: any, cellIndex: number) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ParentComponent), { ssr: false });
