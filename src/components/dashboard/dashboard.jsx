import React, { useState } from "react";
import {
  ListTodo,
  PlusCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Home,
  Users,
  Settings,
} from "lucide-react";
import { useAuth } from "../context";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const { todos, profile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  const handleAddTodo = () => {
    // Todo: Implement add todo functionality
    setNewTodo("");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "add-todo":
        return (
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              Create New Todo
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTodo();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter Todo title"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center space-x-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <PlusCircle size={20} />
                <span>Add Todo</span>
              </button>
            </form>
          </div>
        );
      default:
        return (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-2xl text-gray-600 dark:text-white mb-4">
              Welcome, {profile?.name || "User"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Select an option from the sidebar to get started
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      {/* Enhanced Sidebar - adjusted top position to account for navbar */}
      <div
        className={`bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out fixed top-16 bottom-0 z-10 ${
          isSidebarOpen ? "w-72" : "w-20"
        }`}
      >
        {/* Improved toggle button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-8 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? <ChevronLeft size={18} className="dark:text-white" /> : <ChevronRight size={18} className="dark:text-white" />}
        </button>

        <div className="p-6 h-full flex flex-col">
          {/* App Name instead of "Dashboard" in navbar */}
          <div className="mb-8 flex items-center justify-center">
            {isSidebarOpen ? (
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Todo App</h1>
            ) : (
              <ListTodo size={24} className="text-blue-600 dark:text-blue-400" />
            )}
          </div>
          
          {/* Enhanced Profile Section */}
          {profile && (
            <div className="mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">
                  {profile.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              {isSidebarOpen && (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white text-center truncate">
                    {profile.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm text-center mt-1 truncate">{profile.email}</p>
                </>
              )}
            </div>
          )}

          {/* Enhanced Navigation */}
          <nav className="space-y-2 flex-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group ${
                activeTab === "dashboard" || activeTab === ""
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              <Home size={20} className="group-hover:scale-110 transition-transform duration-300" />
              {isSidebarOpen && <span>Dashboard</span>}
            </button>
            
 
            
           
            
            <Link
              to="/allusers"
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group
                hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300`}
            >
              <Users size={20} className="group-hover:scale-110 transition-transform duration-300" />
              {isSidebarOpen && <span>Users</span>}
            </Link>
            
        
          </nav>

          {/* Enhanced Logout Button */}
          <button
            className="w-full flex items-center space-x-3 p-3 mt-4 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 group border-t border-gray-100 dark:border-gray-700"
            onClick={() => navigate("/")}
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content - adjusted margin left to account for sidebar */}
      <main
        className={`flex-1 p-8 transition-all duration-300 ${
          isSidebarOpen ? "ml-72" : "ml-20"
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;