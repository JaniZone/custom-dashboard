// Dropzone.js

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { dropzoneStyle } from './styles';

const Dropzone = ({ currentWidget, handleFileDrop }) => {
  const onDrop = useCallback((acceptedFiles) => {
    handleFileDrop(currentWidget, acceptedFiles);
  }, [currentWidget]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: ".xlsx, .xls",
  });

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {isDragActive ? <p>{"Drop the files here..."}</p> : <p>{"Drag 'n' drop an Excel file here"}</p>}
    </div>
  );                                                                      
};

export default Dropzone;
