import { useState } from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateUser() {
  const initialSkills = ["JavaScript", "React", "Node.js", "MongoDB", "Express", "TypeScript", "Next.js", "AWS", "Docker", "DevOps"];

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    linkedIn: "",
    joiningDate: "",
    skills: [],
    expertise: "",
    feedback: "",
    goals: "",
    profile_pic: "",
    role: "",
    expeirence: "",
    phone_no: "",
  });

  const [message, setMessage] = useState("");
  const [availableSkills, setAvailableSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (skill) => {
    setUser((prevUser) => ({
      ...prevUser,
      skills: prevUser.skills.includes(skill)
        ? prevUser.skills.filter((s) => s !== skill) // Remove if already selected
        : [...prevUser.skills, skill], // Add if not selected
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !availableSkills.includes(newSkill)) {
      setAvailableSkills([...availableSkills, newSkill]);
    }
    if (!user.skills.includes(newSkill) && newSkill.trim()) {
      setUser((prevUser) => ({
        ...prevUser,
        skills: [...prevUser.skills, newSkill],
      }));
    }
    setNewSkill(""); // Clear input after adding
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: Math.floor(Math.random() * 100),
        name: user.name,
        email: user.email,
        password: user.password,
        linkedIn: user.linkedIn,
        joiningDate: user.joiningDate,
        skills: user.skills,
        expertise: user.expertise.split(",").map((s) => s.trim()),
        feedback: parseInt(user.feedback, 10) || 0,
        goals: user.goals ? [user.goals] : [],
        profile_pic: user.profile_pic,
        role: user.role,
        expeirence: parseInt(user.expeirence, 10) || 0,
        phone_no: parseInt(user.phone_no, 10),
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
      <Link to={'/dashboard'}>
        <button className="flex fixed left-4 top-4 items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-200">
          ⬅️ <FileText className="h-5 w-5" /> Dashboard
        </button>
      </Link>

      <div className="w-full m-3 max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" value={user.name} onChange={handleChange} required className="w-full p-2 border rounded-md" />
          <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required className="w-full p-2 border rounded-md" />
          <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required className="w-full p-2 border rounded-md" />
          <input name="linkedIn" placeholder="LinkedIn Profile URL" value={user.linkedIn} onChange={handleChange} className="w-full p-2 border rounded-md" />
          <input type="date" name="joiningDate" value={user.joiningDate} onChange={handleChange} required className="w-full p-2 border rounded-md" />

          {/* Skill Selection */}
          <div className="border p-3 rounded-md">
            <label className="font-medium">Select Skills:</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {availableSkills.map((skill) => (
                <label key={skill} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={user.skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                    className="w-4 h-4"
                  />
                  {skill}
                </label>
              ))}
            </div>

            {/* Add new skill input */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add new skill"
                className="w-full p-2 border rounded-md"
              />
              <button type="button" onClick={handleAddSkill} className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add
              </button>
            </div>
          </div>

          <input name="expertise" placeholder="Expertise (comma-separated)" value={user.expertise} onChange={handleChange} className="w-full p-2 border rounded-md" />
          <input type="number" name="feedback" placeholder="Feedback (out of 10)" value={user.feedback} onChange={handleChange} className="w-full p-2 border rounded-md" />
          <input name="goals" placeholder="Mention your goal" value={user.goals} onChange={handleChange} className="w-full p-2 border rounded-md" />
          <input name="profile_pic" placeholder="Profile Picture URL" value={user.profile_pic} onChange={handleChange} className="w-full p-2 border rounded-md" />

          <select name="role" value={user.role} onChange={handleChange} className="w-full p-2 border rounded-md">
            <option value="">Select Role</option>
            {["Admin", "Manager", "Employee", "Intern"].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <input type="number" name="expeirence" placeholder="Experience (in years)" value={user.expeirence} onChange={handleChange} className="w-full p-2 border rounded-md" />
          <input type="tel" name="phone_no" placeholder="Phone Number" value={user.phone_no} onChange={handleChange} required className="w-full p-2 border rounded-md" />

          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Create User</button>

          {message && (
            <p className={`text-center mt-2 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
