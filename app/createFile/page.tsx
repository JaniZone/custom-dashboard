// pages/index.tsx
"use client";
import React from 'react';
// import fs from 'fs';
import path from 'path';
import { NextPage } from 'next';

const Home: NextPage = () => {
    const createJsonFile = () => {
        const data = {
            name: 'John Doe',
            age: 30,
            email: 'johndoe@example.com'
        };

        const jsonData = JSON.stringify(data, null, 2);
        const filePath = path.join(process.cwd(), 'public', 'data.json');

        // try {
        //     fs.writeFileSync(filePath, jsonData);
        //     console.log('JSON file saved successfully');
        // } catch (error) {
        //     console.error('Error saving JSON file:', error);
        // }
    };

    return (
        <div>
            <button onClick={createJsonFile}>Create JSON File</button>
        </div>
    );
};

export default Home;
