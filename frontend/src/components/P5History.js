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
                let p5HistoryResponse = await api.get(`/users/${id}/p5`);

                const promises = p5HistoryResponse.map(async (p5Record) => {
                    const user = await api.get(`/users/${p5Record.givenTo}`);
                    p5Record.givenToName = user.Name;
                    return p5Record;
                });

                Promise.all(promises)
                    .then((updatedP5HistoryResponse) => {
                        // Update p5HistoryResponse with the resolved values
                        p5HistoryResponse = updatedP5HistoryResponse;
                        setP5History(p5HistoryResponse);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                const user = await api.get(`/users/${id}`);
                setP5Balance(user.P5Balance);
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
        <div className="table-container">
            <h1>P5 History</h1>
            <p>P5 Balance: {p5Balance}</p>

            <Link to={`/${id}/rewards/new`}>
                <button className="table-cell-button">Create New Reward</button>
            </Link>

            <table className="table-container">
                <thead>
                    <tr className="table-header-row">
                        <th className="table-cell">#</th>
                        <th className="table-cell">Date-Time</th>
                        <th className="table-cell">P5 given</th>
                        <th className="table-cell">User Name</th>
                        <th className="table-cell">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {p5History.map((p5, index) => (
                        <tr key={p5._id} className="table-cell">
                            <td>{index + 1}</td>
                            <td>{p5.datetimeStamp}</td>
                            <td>{p5.points}</td>
                            <td>{p5.givenToName}</td>
                            <td className="table-cell-button">
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
