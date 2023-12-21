import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((response) => {
        console.log('API Response:', response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li> 
        ))}
      </ul>
    </div>
  );
}

export default Users;