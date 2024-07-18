// pages/api/createJsonFile.ts
"use client";
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = {
            name: 'John Doe',
            age: 30,
            email: 'johndoe@example.com'
        };

        const jsonData = JSON.stringify(data, null, 2);
        const filePath = path.join(process.cwd(), 'public', 'data.json');

        try {
            fs.writeFileSync(filePath, jsonData);
            console.log('JSON file saved successfully');
            res.status(200).json({ message: 'Data saved successfully' });
        } catch (error) {
            console.error('Error saving JSON file:', error);
            res.status(500).json({ message: 'Error saving data' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
