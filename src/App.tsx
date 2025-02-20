import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Star, X } from 'lucide-react';
import { fetchFeedback, type Feedback } from './services/feedback';

function App() {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const data = await fetchFeedback();
        setFeedback(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFeedback();
  }, []);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Management</h1>

        {/* Workload Calendar */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Workload</h2>
          <div className="border rounded-lg p-4">
            <DayPicker
              mode="multiple"
              selected={selectedDays}
              onSelect={setSelectedDays}
              className="mx-auto"
            />
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-700">Projects Completed</h3>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-700">On-time Delivery</h3>
              <p className="text-2xl font-bold text-green-600">96%</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-700">Client Satisfaction</h3>
              <p className="text-2xl font-bold text-purple-600">4.8/5</p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <form onSubmit={handleAddSkill} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </form>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Experience</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium">Senior Developer</h3>
              <p className="text-gray-600">2020 - Present</p>
              <p className="text-gray-700 mt-2">
                Led multiple successful projects and mentored junior developers.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium">Full Stack Developer</h3>
              <p className="text-gray-600">2018 - 2020</p>
              <p className="text-gray-700 mt-2">
                Developed and maintained various web applications.
              </p>
            </div>
          </div>
        </section>

        {/* Availability */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Availability</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Working Hours</h3>
              <input
                type="text"
                value="9:00 AM - 5:00 PM EST"
                className="w-full px-3 py-2 border rounded-lg"
                readOnly
              />
            </div>
            <div>
              <h3 className="font-medium mb-2">Time Zone</h3>
              <input
                type="text"
                value="Eastern Time (ET)"
                className="w-full px-3 py-2 border rounded-lg"
                readOnly
              />
            </div>
          </div>
        </section>

        {/* Development Goals */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Development Goals</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium">Technical Leadership</h3>
              <p className="text-gray-700">
                Develop leadership skills and mentor junior developers
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium">Cloud Architecture</h3>
              <p className="text-gray-700">
                Master cloud-native application development
              </p>
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Feedback</h2>
          {loading ? (
            <p>Loading feedback...</p>
          ) : (
            <div className="space-y-4">
              {feedback.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.author}</p>
                      <p className="text-sm text-gray-500">{format(new Date(item.date), 'PPP')}</p>
                    </div>
                    <div className="flex">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{item.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Collaboration History */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Collaboration History</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">E-commerce Platform Redesign</h3>
              <p className="text-sm text-gray-500">Team Size: 6 members</p>
              <p className="text-gray-700 mt-2">
                Led the frontend development team in redesigning the main e-commerce platform.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">API Integration Project</h3>
              <p className="text-sm text-gray-500">Team Size: 4 members</p>
              <p className="text-gray-700 mt-2">
                Collaborated with the backend team to integrate multiple third-party APIs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;