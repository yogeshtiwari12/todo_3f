import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { 
  CalendarDays, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Tag,
  CheckSquare,
  Search,
  Filter,
  Loader2
} from "lucide-react";
import { mainurl } from "./commonfile";

const UserTodos = () => {
  const { uid } = useParams();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${mainurl}/todosroute/userstodo/${uid}`, {
          withCredentials: true,
        });
        setTodos(response.data.todos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [uid]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />;
      case 'pending':
        return <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-400" />;
      default:
        return <AlertCircle size={16} className="text-blue-600 dark:text-blue-400" />;
    }
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || todo.status?.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex justify-center">
            My Tasks
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" 
                size={20} 
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Todos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTodos.map((todo) => (
            <div 
              key={todo._id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{todo.title}</h2>
                  {getStatusIcon(todo.status)}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">{todo.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={16} className="text-blue-500 dark:text-blue-400" />
                    {new Date(todo.dueDate || todo.dueDays).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} className="text-blue-500 dark:text-blue-400" />
                    {todo.time}
                  </span>
                  {todo.category && (
                    <span className="flex items-center gap-1">
                      <Tag size={16} className="text-blue-500 dark:text-blue-400" />
                      {todo.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTodos.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No tasks found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTodos;