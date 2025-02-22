import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";

export default function CreateUser() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    linkedIn: "",
    joiningDate: "",
    skills: "",
    expertise: "",
    feedback: "",
    goals: "",
    profile_pic: "",
    role: "",
    expeirence: "",
    phone_no: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: Math.floor(Math.random() * 100), // Convert to integer, default to 0 if empty
        name: user.name,
        email: user.email,
        password: user.password,
        linkedIn: user.linkedIn,
        joiningDate: user.joiningDate,
        skills: user.skills.split(",").map((s) => s.trim()), // Convert to array
        expertise: user.expertise.split(",").map((s) => s.trim()), // Convert to array of strings
        feedback: parseInt(user.feedback, 10) || 0, // Convert to number
        goals: user.goals ? [user.goals] : [], // Convert to an array
        profile_pic: user.profile_pic,
        role: user.role,
        experience: parseInt(user.expeirence, 10) || 0, // Convert to number
        phone_no: parseInt(user.phone_no, 10), // Convert to number
      };

      console.log("User Payload:", payload);

      const response = await fetch("https://model.aaroegun.in/create_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create user: ${errorText}`);
      }

      const data = await response.json();
      console.log("User created:", data);
      setMessage("✅ User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("❌ Failed to create user. Please check the input.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Create User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Full Name" value={user.name} onChange={handleChange} required />

            <Input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
            <Input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />

            <Input name="linkedIn" placeholder="LinkedIn Profile URL" value={user.linkedIn} onChange={handleChange} />
            <Input type="date" name="joiningDate" value={user.joiningDate} onChange={handleChange} required />

            <Input name="skills" placeholder="Skills (comma-separated)" value={user.skills} onChange={handleChange} required />
            <Input name="expertise" placeholder="Expertise (comma-separated)" value={user.expertise} onChange={handleChange} />

            <Input type="number" name="feedback" placeholder="Feedback (out of 10)" value={user.feedback} onChange={handleChange} />
            <Input name="goals" placeholder="Mention your goal" value={user.goals} onChange={handleChange} />
            <Input name="profile_pic" placeholder="Profile Picture URL" value={user.profile_pic} onChange={handleChange} />

            <Select onValueChange={(value) => setUser({ ...user, role: value })} value={user.role}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {["Admin", "Manager", "Employee", "Intern"].map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input type="number" name="expeirence" placeholder="expeirence (in years)" value={user.expeirence} onChange={handleChange} />
            <Input type="tel" name="phone_no" placeholder="Phone Number" value={user.phone_no} onChange={handleChange} required />

            <Button type="submit" className="w-full">Create User</Button>

            {message && (
              <p className={`text-center mt-2 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
