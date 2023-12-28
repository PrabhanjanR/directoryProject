import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const Directory = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from API
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      setUsers(response.data);
    });
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        // Group posts by userId
        const groupedPosts = response.data.reduce((acc, post) => {
          const userId = post.userId;
          if (!acc[userId]) {
            acc[userId] = [];
          }
          acc[userId].push(post);
          return acc;
        }, {});

        setPosts(groupedPosts);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleUserClick = (userId) => {
    // Navigate to the user's details page
    navigate(`/user/${userId}`);
  };

  return (
    <div className='box'>
        <section>
      <div className='label1'>Directory</div>
      <div className="user-blocks">
        {users.map((user) => (
          <Link to={`/user/${user.id}`} key={user.id} className="user-link">
            <div className="user-block" onClick={() => handleUserClick(user.id)}>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-posts">Posts: {posts[user.id]?.length || 0}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </section>
    </div>
  );
};

export default Directory;
