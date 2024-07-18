// components/CreateJsonButton.js
"use client";
import React from 'react';

const CreateJsonButton = () => {
    const createJsonFile = () => {
        const data = {
            name: 'John Doe',
            age: 30,
            email: 'johndoe@example.com'
        };

        const jsonData = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data1.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <button onClick={createJsonFile}>Create JSON File</button>
        </div>
    );
};

export default CreateJsonButton;
