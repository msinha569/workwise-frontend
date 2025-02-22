import React from 'react';
import {
  Users,
  Target,
  TrendingUp,
  Clock,
  Briefcase,
  FileText,
  User,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';
import GetAllUsers from '../components/GetAllUsers';

function Dashboard() {
  return (
    <div className="space-y-10 p-6 ">
       <Link to={'/'}><button className="flex fixed left-4 top-4 items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
       ⬅️ <FileText className="h-5 w-5" /> Home
          </button></Link>
      <section className=''>
        <h2 className="text-xl font-semibold text-gray-900">Management Actions</h2>
        <p className="text-gray-600 mb-4">Manage work, employees, and feedback efficiently using the tools below.</p>
        <div className="flex flex-wrap gap-4">
          <Link to={'/workmanagement'}>
          <button  className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            <Briefcase className="h-5 w-5" /> Work Management
          </button>
          </Link>
          <Link to={'/delete-task'}>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            <FileText className="h-5 w-5" /> Delete Task
          </button>
          </Link>
          <Link to={'/createuser'}>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            <FileText className="h-5 w-5" /> Create User
          </button>
          </Link>
          
          {/* <Link to={'/feedback'}>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            <MessageSquare className="h-5 w-5" /> Feedback Form
          </button>
          </Link> */}
        </div>
      </section>
            <GetAllUsers/>
     

      <TaskList />
    </div>
  );
}

function StatCard({ icon, title, value, change, trend }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            {icon}
          </div>
          <div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="text-2xl font-semibold text-gray-900">{value}</div>
          </div>
        </div>
        <div className={`flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium ml-1">{change}</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;