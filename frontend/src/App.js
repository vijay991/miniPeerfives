import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import ViewUser from './components/ViewUser';
import P5History from './components/P5History';
import RewardHistory from './components/RewardHistory';
import NewReward from './components/NewReward';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* User List View */}
          <Route path="/" element={<UserList />} />

          {/* Create New User */}
          <Route path="/new" element={<CreateUser />} />

          {/* View User Details */}
          <Route path="/:id" element={<ViewUser />} />

          {/* P5 History */}
          <Route path="/:id/p5" element={<P5History />} />

          {/* Reward History */}
          <Route path="/:id/rewards" element={<RewardHistory />} />

          {/* Create New Reward */}
          <Route path="/:id/rewards/new" element={<NewReward />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
