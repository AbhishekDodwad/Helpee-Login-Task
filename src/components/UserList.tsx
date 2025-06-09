import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  login: {
    username: string;
  };
  picture: {
    thumbnail: string;
  };
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?results=10&page=${page}`
      );
      
      setUsers(prev => [...prev, ...response.data.results]);
      setHasMore(true); 
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && hasMore) {
      fetchUsers();
    }
  }, [fetchUsers, loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="user-list-container">
      <div className="header">
        <h2>User List</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      
      <div className="users">
        {users.map((user, index) => (
          <div key={`${user.id}-${index}`} className="user-card">
            <img src={user.picture.thumbnail} alt={`${user.name.first}'s thumbnail`} />
            <h3>{`${user.name.first} ${user.name.last}`}</h3>
            <p>Email: {user.email}</p>
            <p>Username: {user.login.username}</p>
          </div>
        ))}
      </div>
      
      {loading && <div className="loading">Loading more users...</div>}
    </div>
  );
};

export default UserList;