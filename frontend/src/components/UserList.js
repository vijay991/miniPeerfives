import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api'; // Assuming you have an api service

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                console.log(response);
                setUsers(response);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <div>
            <h1>User List</h1>
            <Link to="/new">
                <button>Create New User</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>P5 Balance</th>
                        <th>Reward Balance</th>
                        <th>Login</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.Name}</td>
                            <td>{user.P5Balance}</td>
                            <td>{user.RewardBalance}</td>
                            <td>
                                <Link to={`/${user.id}`}>
                                    <button>Login</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
