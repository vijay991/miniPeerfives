import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const RewardHistory = () => {
    const { id } = useParams();

    const [rewardBalance, setRewardBalance] = useState(0);
    const [rewardHistory, setRewardHistory] = useState([]);

    useEffect(() => {
        const fetchRewardData = async () => {
            try {
                const rewardHistoryResponse = await api.get(`/users/${id}/rewards`);
                const user = await api.get(`/users/${id}`);
                setRewardBalance(user.RewardBalance);
                setRewardHistory(rewardHistoryResponse);
            } catch (error) {
                console.error('Error fetching Rewards history:', error);
            }
        };

        fetchRewardData();
    }, [id]);



    return (
        <div className="table-container">
            <h1>Reward History</h1>
            <p>Rewards Balance: {rewardBalance}</p>
            <table className="table-container">
                <thead>
                    <tr className="table-header-row">
                        <th className="table-cell">#</th>
                        <th className="table-cell">Date-Time</th>
                        <th className="table-cell">Rewards received</th>
                        <th className="table-cell">User Name</th>
                    </tr>
                </thead>
                <tbody>
                    {rewardHistory.map((reward, index) => (
                        <tr key={reward._id} className="table-cell">
                            <td>{index + 1}</td>
                            <td>{reward.datetimeStamp}</td>
                            <td>{reward.points}</td>
                            <td>{reward.givenByName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RewardHistory;
