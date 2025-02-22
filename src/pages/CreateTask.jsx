import React from 'react'
import TaskDashboard from '../components/taskSubmit'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'

const CreateTask = () => {
  return (
    <div className='p-3'>
      <Link to={'/dashboard'}><button className="flex  fixed items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            <FileText className="h-5 w-5" />⬅️ Dashboard
          </button></Link>
      <div className='text-center font-bold text-3xl m-2'>Create a task that will be allocated to your employees logically.</div>
      <TaskDashboard />
    </div>
  )
}

export default CreateTask
