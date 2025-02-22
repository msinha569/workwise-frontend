import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function DeleteTask() {
  const [taskId, setTaskId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!taskId) {
      setMessage("❌ Task ID is required.");
      return;
    }

    try {
      const response = await fetch(`https://model.aaroegun.in/delete_task?id=${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Delete response:", data);
      setMessage(`✅ Task ${taskId} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting task:", error);
      setMessage("❌ Failed to delete task. Please check the ID.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
       <Link to={'/dashboard'}><button className="flex fixed left-4 top-4 items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            <FileText className="h-5 w-5" /> Dashboard
          </button></Link>
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Delete Task</h2>
          <Input
            placeholder="Enter Task ID"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            required
          />
          <Button onClick={handleDelete} className="w-full mt-4">
            Delete Task
          </Button>
          {message && <p className={`text-center mt-2 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
 