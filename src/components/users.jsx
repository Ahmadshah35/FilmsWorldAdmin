import React, { useEffect, useState } from "react";
import "../style/users.css"; // Create this for custom styling if needed.

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("API Calling...");
  
    // const token = localStorage.getItem("authToken");  // Assuming token is stored in localStorage
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjVkMDU5ZWVlNTM4OWE0YWI0OTc2NCIsIm5hbWUiOiJudWxsIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTc0NDE2MjkyMH0.fTi5_cXyk9q2T--2QJmAUzySA12zRz0JqlTUapNCNhI" 

    fetch("https://appsdemo.pro/FilmsWorld-backend/api/user/get-all-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  // Add the token here
      }
    })
      .then((response) => {
        console.log("Response Status ===>", response.status);
  
        if (!response.ok) {
          throw new Error("API Failed with status " + response.status);
        }
  
        return response.json();
      })
      .then((data) => {
        console.log("API DATA ===>", data);
  
        if (data?.data) {
          setUsers(data.data);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);
  
  

  return (
    <div className="users-page">
      <h1>All Users</h1>

      <div className="users-grid">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="movie-card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
            </div>
          ))
        ) : (
          <p>No Users Found!</p>
        )}
      </div>
    </div>
  );
};

export default Users;
