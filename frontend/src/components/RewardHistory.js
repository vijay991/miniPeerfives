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
                let rewardHistoryResponse = await api.get(`/users/${id}/rewards`);
                const user = await api.get(`/users/${id}`);

                const promises = rewardHistoryResponse.map(async (p5Record) => {
                    const user = await api.get(`/users/${p5Record.givenBy}`);
                    p5Record.givenByName = user.Name;
                    return p5Record;
                });

                Promise.all(promises)
                    .then((updatedRewardHistory) => {
                        rewardHistoryResponse = updatedRewardHistory;
                        setRewardHistory(rewardHistoryResponse);
                        setRewardBalance(user.RewardBalance);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
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
