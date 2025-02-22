import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function TaskList() {
  const [taskIds, setTaskIds] = useState([]); // Store only task IDs initially
  const [taskDetails, setTaskDetails] = useState({}); // Store details when fetched
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTaskIds = async () => {
      try {
        // Step 1: Fetch only task IDs
        const response = await fetch("https://model.aaroegun.in/get_all_tasks");
        if (!response.ok) throw new Error("Failed to fetch task IDs");

        const ids = await response.json();
        setTaskIds(ids);
      } catch (err) {
        console.error("Error fetching task IDs:", err);
        setError("❌ Failed to load task IDs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskIds();
  }, []);

  // Fetch task details when user clicks "Load Details"
  const fetchTaskDetails = async (id) => {
    if (taskDetails[id]) return; // Prevent refetching if already loaded

    try {
      const response = await fetch(`https://model.aaroegun.in/get_task?id=${id}`);
      if (!response.ok) throw new Error("Failed to fetch task details");

      const task = await response.json();
      setTaskDetails((prev) => ({ ...prev, [id]: task }));
    } catch (err) {
      console.error(`Error fetching task ${id}:`, err);
      setTaskDetails((prev) => ({ ...prev, [id]: { error: "❌ Failed to load task" } }));
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4">All Tasks</h2>

      {loading && <p>Loading task IDs...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && taskIds.length === 0 && <p>No tasks available.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {taskIds.map((id) => (
          <Card key={id} className="w-80 bg-white shadow-md rounded-lg p-4">
            <CardContent>
              <h3 className="text-lg font-semibold">Task ID: {id}</h3>

              {/* Show details if loaded */}
              {taskDetails[id] ? (
                taskDetails[id].error ? (
                  <p className="text-red-500">{taskDetails[id].error}</p>
                ) : (
                  <>
                    <p className="text-gray-700">📌 Name: {taskDetails[id].name}</p>
                    <p className="text-gray-700">
                      🛠 Skills: {taskDetails[id].skills.join(", ")}
                    </p>
                    <p className="text-gray-700">⏳ Time: {taskDetails[id].time} hours</p>
                    <p className="text-gray-700">📜 Description: {taskDetails[id].description}</p>
                    <p className="text-gray-700">⭐ Quality: {taskDetails[id].quality}/10</p>
                    <p
                      className={`text-sm font-bold ${
                        taskDetails[id].status === "open" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      🔹 Status: {taskDetails[id].status}
                    </p>
                  </>
                )
              ) : (
                <Button onClick={() => fetchTaskDetails(id)} className="mt-4">
                  🔍 Load Details
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
