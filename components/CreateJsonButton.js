// components/CreateJsonButton.js

import React from 'react';

const CreateJsonButton = () => {
    const createJsonFile = async () => {
        try {
            const response = await fetch('/api/createJsonFile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'John Doe',
                    age: 30,
                    email: 'johndoe@example.com'
                }),
            });

            if (response.ok) {
                console.log('JSON file created successfully');
            } else {
                console.error('Failed to create JSON file:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating JSON file:', error);
        }
    };

    return (
        <div>
            <button onClick={createJsonFile}>Create JSON File</button>
        </div>
    );
};

export default CreateJsonButton;
