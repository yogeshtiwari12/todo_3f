import React, { useState } from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
import axios from 'axios';
import { mainurl } from './commonfile';

const Todo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);
    return twoDaysLater.toISOString().split('T')[0];
  });

  const addTodo = async () => {
    if (!title || !description || !dueDate || !time) {
      alert('Please fill all the fields');
      return;
    }

    // Combine date and time into a single Date object
    const [hours, minutes] = time.split(':');
    const dueDateObj = new Date(dueDate);
    dueDateObj.setHours(parseInt(hours), parseInt(minutes), 0);

    const newTodo = {
      title,
      description,
      dueDate: dueDateObj,
      time,
      // Note: uid and userId should be added here based on your auth system
    };

    try {
      const response = await axios.post(`${mainurl}/todosroute/addtodo`, newTodo, { withCredentials: true });
        if (response.status) {
        alert(response.data.message);
        }
      resetForm();
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add todo');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);
    setDueDate(twoDaysLater.toISOString().split('T')[0]);
    setTime('');
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl flex justify-center font-bold text-blue-800 mb-6">Create Todo</h1>

          <div className="space-y-4 mb-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Title</label>
              <div className="flex items-center border border-blue-300 rounded-md">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter todo title"
                  className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter todo description"
                rows={3}
                className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Due Date Input */}
            <div>
              <label className="text-sm font-medium text-blue-900 mb-1 flex items-center">
                <Calendar className="mr-2 text-blue-500" size={16} /> Due Date (Default: 2 days from today)
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
                className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Time Input */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Add Todo Button */}
            <div className="flex space-x-4">
              <button
                onClick={addTodo}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="mr-2" size={18} />
                Add Todo
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
