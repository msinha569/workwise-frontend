import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileManagement from '././pages/ProfileManagement';
import WorkManagement from './pages/WorkManagement';
import ShowWork from './pages/ShowWork';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import FeedbackPage from './pages/FeedbackForm';
import CreateTask from './pages/CreateTask';
import CreateUser from './components/CreateUser';
import TaskResults from './components/TaskResults';
import DeleteTask from './components/DeleteTask';

function App() {
  return (
      <Routes>
        <Route path="/profilemanagement" element={<ProfileManagement />} />
        <Route path="/dashboard/profilemanagement" element={<ProfileManagement />} />
        <Route path="/workmanagement" element={<CreateTask />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/showwork" element={<ShowWork />} />
        <Route path='/' element={<Home/>}/>
        <Route path='/feedback' element={<FeedbackPage/>}/>
        <Route path="/createtask" element={<CreateTask />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/task-results" element={<TaskResults />} />
        <Route path="/delete-task" element={<DeleteTask />} />
      </Routes>
  );
}

export default App;