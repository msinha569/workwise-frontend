import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";

export default function TaskResults() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("taskUsers");
    if (storedData) {
      setUsers(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Compatible Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <Card key={user.id} className="w-72 p-4 bg-white shadow-lg rounded-lg">
              <CardContent>
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
                <p className="text-sm text-gray-500">Skills: {user.skills.join(", ")}</p>
                <p className="text-sm text-gray-500">Experience: {user.expeirence} years</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No compatible users found.</p>
        )}
      </div>
    </div>
  );
}
