import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';

const CreateNewUser = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            // Validate the name
            if (!name.trim()) {
                alert('Please enter a valid name');
                return;
            }

            // Make API request to create a new user
            await api.post('/users', { Name: name });

            // Redirect back to the list view
            navigate('/');
        } catch (error) {
            console.error('Error creating new user:', error);
        }
    };

    const handleCancel = () => {
        // Redirect back to the list view
        navigate('/');
    };

    return (
        <div>
            <h1>Create New User</h1>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <div><button onClick={handleSave}>Save</button></div>
            <div><button onClick={handleCancel}>Cancel</button></div>
        </div>
    );
};

export default CreateNewUser;
