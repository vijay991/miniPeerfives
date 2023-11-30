import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const NewReward = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [usersList, setUsersList] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [points, setPoints] = useState(0);
    const [userP5Balance, setUserP5Balance] = useState(0);

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                // Fetch the list of all users, except the current user
                const response = await api.get('/users');
                const filteredUsers = response.filter(user => user._id !== id);
                setUsersList(filteredUsers);

                const user = await api.get(`/users/${id}`);

                setUserP5Balance(user.P5Balance);
            } catch (error) {
                console.error('Error fetching users list:', error);
            }
        };

        fetchUsersList();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validate the points 
            if (points <= 0 || points > 100 || points > userP5Balance) {
                alert('Invalid points value');
                return;
            }

            // Make API request to create a new reward
            await api.post(`/users/${id}/p5`, { points, givenTo: selectedUser });

            // Redirect back to the Reward History view
            navigate(`/${id}/p5`);
        } catch (error) {
            console.error('Error creating new reward:', error);
        }
    };

    const handleCancel = () => {
        // Redirect back to the Reward History view
        navigate(`/${id}/p5`);
    };

    return (
        <div>
            <h1>New Reward</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">Select User:</label>
                <select
                    id="user"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                >
                    <option value="" disabled>Select a user</option>
                    {usersList.map((user) => (
                        <option key={user._id} value={user.Name}>
                            {user.Name}
                        </option>
                    ))}
                </select>

                <label htmlFor="points">Enter Points (max 100):</label>
                <input
                    type="number"
                    id="points"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    max="100"
                />

                <p>User's P5 Balance: {userP5Balance}</p>
                <div>
                    <button type="submit" disabled={!selectedUser || points <= 0 || points > 100 || points > userP5Balance}>
                        Submit
                    </button>
                </div>

                <div> <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
                </div>
            </form >
        </div >
    );
};

export default NewReward;
