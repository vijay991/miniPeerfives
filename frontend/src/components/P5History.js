import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const P5History = () => {
    const { id } = useParams();

    const [p5Balance, setP5Balance] = useState(0);
    const [p5History, setP5History] = useState([]);

    useEffect(() => {
        const fetchP5Data = async () => {
            try {
                const p5HistoryResponse = await api.get(`/users/${id}/p5`);

                const user = await api.get(`/users/${id}`);
                setP5Balance(user.P5Balance);
                setP5History(p5HistoryResponse);
            } catch (error) {
                console.error('Error fetching P5 history:', error);
            }
        };

        fetchP5Data();
    }, [id]);

    const handleDeleteP5 = async (p5Id) => {
        try {
            // Make API request to delete P5 transaction
            await api.delete(`/users/${id}/p5/${p5Id}`);

            // Refresh P5 history after deletion
            const p5HistoryResponse = await api.get(`/users/${id}/p5`);
            setP5History(p5HistoryResponse);

            const user = await api.get(`/users/${id}`);
            setP5Balance(user.P5Balance);
        } catch (error) {
            console.error('Error deleting P5 transaction:', error);
        }
    };

    return (
        <div>
            <h1>P5 History</h1>
            <p>P5 Balance: {p5Balance}</p>

            <Link to={`/${id}/rewards/new`}>
                <button>Create New Reward</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date-Time</th>
                        <th>P5 given</th>
                        <th>User Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {p5History.map((p5, index) => (
                        <tr key={p5._id}>
                            <td>{index + 1}</td>
                            <td>{p5.datetimeStamp}</td>
                            <td>{p5.points}</td>
                            <td>{p5.givenToName}</td>
                            <td>
                                <button onClick={() => handleDeleteP5(p5._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default P5History;
