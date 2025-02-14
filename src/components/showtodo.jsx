import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, Clock, FileText, Check, Plus, Calendar, ListTodo } from 'lucide-react';
import { useAuth } from './context';
import { mainurl } from './commonfile';

function Showtodo() {
  const { todos } = useAuth();
  const [localTodos, setLocalTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedTime, setUpdatedTime] = useState('');
  const [updatedDueDate, setUpdatedDueDate] = useState('');
  console.log("ef",todos)

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  useEffect(() => {
    if (todos) setLocalTodos(todos);
  }, [todos]);

  const handleUpdate = async (id) => {
    if (!updatedTitle || !updatedTime || !updatedDueDate) {
      alert('Title, Time, and Due Date are required!');
      return;
    }

    try {
      const response = await axios.put(
        `${mainurl}/todosroute/updatetodo/${id}`,
        {
          title: updatedTitle,
          description: updatedDescription,
          time: updatedTime,
          dueDays: updatedDueDate,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedTodos = localTodos.map((todo) =>
          todo._id === id
            ? { ...todo, title: updatedTitle, description: updatedDescription, time: updatedTime, dueDate: updatedDueDate }
            : todo
        );
        setLocalTodos(updatedTodos);
        setEditingTodo(null);
        setUpdatedTitle('');
        setUpdatedDescription('');
        setUpdatedTime('');
        setUpdatedDueDate('');
        alert('Todo updated successfully!');
      }
    } catch (error) {
      console.error('Error updating todo:', error.message);
      alert('Failed to update todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${mainurl}/todosroute/deletetodo/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setLocalTodos(localTodos.filter((todo) => todo._id !== id));
        alert('Todo deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting todo:', error.message);
      alert('Failed to delete todo');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-center  items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 flex items-center">
            My Todos
          </h1>
        
        </div>

        {/* Update Todo Section */}
        {editingTodo && (
          <div className="bg-white rounded-xl shadow-2xl p-6 mb-8 border-l-4 border-blue-500">
            <div className="space-y-4">
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Todo Title"
              />
              
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Description (Optional)"
                rows="3"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  value={updatedTime}
                  onChange={(e) => setUpdatedTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                
                <input
                  type="date"
                  value={updatedDueDate}
                  
                  onChange={(e) => setUpdatedDueDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleUpdate(editingTodo._id)}
                  className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Todo
                </button>
                <button
                  onClick={() => setEditingTodo(null)}
                  className="bg-blue-100 text-blue-800 py-3 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-6">
          {localTodos.length === 0 ? (
            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <ListTodo className="mx-auto mb-4 text-blue-300" size={48} />
              <p className="text-xl text-blue-800">No todos yet. Create your first todo!</p>
            </div>
          ) : (
            localTodos.map((todo) => (
              <div
                key={todo._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500 p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-2">
                      {todo.title[0].toUpperCase() + todo.title.slice(1)}
                    </h3>
                    {todo.description && (
                      <p className="text-blue-500 text-lg mb-4 opacity-70">{todo.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-blue-700">
                      <div className="flex items-center">
                        <Clock className="mr-2 text-blue-500" size={20} />
                        <span>{todo.time || 'No time set'}</span>
                      </div>


                      <div className="flex items-center">
                        <Calendar className="mr-2 text-blue-500" size={20} />
                        <span>{formatDate(todo?.dueDays)}</span>
                        
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingTodo(todo);
                        setUpdatedTitle(todo.title);
                        setUpdatedDescription(todo.description || '');
                        setUpdatedTime(todo.time || '');
                        setUpdatedDueDate(todo?.dueDate || '');
                      }}
                      className="text-blue-600 hover:bg-blue-100 p-2 rounded-full"
                    >
                      <Edit size={24} />
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Showtodo;
