import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";

export default function CreateTask() {
  const [task, setTask] = useState({
    name: "",
    skills: "",
    time: "",
    description: "",
    quality: "",
    status: "open",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const payload = {
        ...task,
        skills: task.skills.split(","), 
        time: Number(task.time), 
        quality: Number(task.quality), 
      };
      const payload2 = {
        
        "id": Math.floor(Math.random() * 100),
        "name": task.name,
            "skills": 
              task.skills.split(",")
            ,
            "time": task.time,
            "description": task.description,
            "quality": task.quality,
            "status": task.status
          
      }
      console.log("payload2 is ",payload2);

      const response = await fetch("https://model.aaroegun.in/task_submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify(payload2),
      });
      
      if (!response.ok) {
        const errorText =  response.data.error;
        throw new Error(`Failed to create task: ${errorText}`);
      }

      const data = await response.json();
      console.log("Task submitted:", data.compatible_users);


    // Redirect to results page
    

      const empDatas = [];

      for (const key of Object.keys(data.compatible_users)) {
        try {
          const response = await fetch(`https://model.aaroegun.in/get_user?id=${key}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
      
          if (!response.ok) throw new Error(`Failed to fetch user ${key}`);
      
          const empData = await response.json();
          empDatas.push(empData);
        } catch (error) {
          console.error(`Error fetching user ${key}:`, error);
        }
      }
        console.log("EmpDatas are",empDatas);
              
      setMessage("✅ Task created successfully!");

      localStorage.setItem("taskUsers", JSON.stringify(empDatas));

      // Navigate to results page
      window.location.href = "/task-results";
    } catch (error) {
      console.error("Error submitting task:", error);
      setMessage("❌ Failed to create task. Please check the input.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Create Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Task Name" value={task.name} onChange={handleChange} required />
            <Input name="skills" placeholder="Skills (comma-separated)" value={task.skills} onChange={handleChange} required />
            <Input name="time" placeholder="Time (in hours)" value={task.time} onChange={handleChange} required />
            <Input name="description" placeholder="Description" value={task.description} onChange={handleChange} required />

            <Select onValueChange={(value) => setTask({ ...task, quality: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Quality (1-10)" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setTask({ ...task, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {["open", "on hold", "completed", "closed"].map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="submit" className="w-full">Submit Task</Button>

            {message && <p className={`text-center mt-2 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
