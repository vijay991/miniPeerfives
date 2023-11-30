import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

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
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <Link to="/new">
                <button>Create New User</button>
            </Link>

            <table className="table-container">
                <thead>
                    <tr className="table-header-row">
                        <th className="table-cell">#</th>
                        <th className="table-cell">Name</th>
                        <th className="table-cell">P5 Balance</th>
                        <th className="table-cell">Reward Balance</th>
                        <th className="table-cell">Login</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id} className="table-cell">
                            <td>{index + 1}</td>
                            <td>{user.Name}</td>
                            <td>{user.P5Balance}</td>
                            <td>{user.RewardBalance}</td>
                            <td className="table-cell-button">
                                <Link to={`/${user._id}`}>
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
