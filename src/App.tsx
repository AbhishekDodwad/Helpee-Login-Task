import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;