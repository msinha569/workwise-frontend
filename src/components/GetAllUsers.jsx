import React, { useEffect, useState } from "react";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://model.aaroegun.in/get_all_users");
        if (!response.ok) throw new Error("Failed to fetch user IDs");
        
        const userIds = await response.json();
        const userDetails = [];

        for (const id of userIds) {
          try {
            const userResponse = await fetch(`https://model.aaroegun.in/get_user?id=${id}`);
            if (!userResponse.ok) throw new Error(`Failed to fetch user ${id}`);
            
            const userData = await userResponse.json();
            userDetails.push(userData);
          } catch (err) {
            console.error(`Error fetching user ${id}:`, err);
          }
        }

        setUsers(userDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {users.map((user) => (
        <div key={user.id} className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-lg font-semibold text-center mt-2">{user.name}</h2>
          <p className="text-center text-gray-600">ID: {user.id}</p>
          <div className="mt-2">
            <h3 className="text-sm font-medium">Skills:</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {user.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetAllUsers;