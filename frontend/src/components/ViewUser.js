import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ViewUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [loggedInUserP5Balance, setLoggedInUserP5Balance] = useState(0);
    const [loggedInUserRewardBalance, setLoggedInUserRewardBalance] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user details by ID
                const response = await api.get(`/users/${id}`);
                setName(response.Name);

                setLoggedInUserP5Balance(response.P5Balance);
                setLoggedInUserRewardBalance(response.RewardBalance);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleSave = async () => {
        try {
            // Validate the name (add more validation as needed)
            if (!name.trim()) {
                alert('Please enter a valid name');
                return;
            }

            // Make API request to update user details
            await api.put(`/users/${id}`, { Name: name });

            // Redirect back to the list view
            navigate('/');
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    const handleViewP5History = () => {
        // Redirect to P5 history view
        navigate(`/${id}/p5`);
    };

    const handleViewRewardHistory = () => {
        // Redirect to Reward history view
        navigate(`/${id}/rewards`);
    };

    return (
        <div>
            <h1>View User</h1>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <div>
                <button onClick={handleSave}>Save</button>
            </div>

            <div>
                <button onClick={handleViewP5History}>View P5 History (P5 Balance: {loggedInUserP5Balance})</button>
            </div>

            <div>
                <button onClick={handleViewRewardHistory}>View Reward History (Reward Balance: {loggedInUserRewardBalance})</button>
            </div>
        </div>
    );
};

export default ViewUser;
