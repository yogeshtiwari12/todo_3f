import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Users, Search, Filter, Mail, Award, Loader2, 
  Building, ChevronRight, User, Calendar, Settings,
  ArrowUpRight, BarChart3
} from "lucide-react";
import { mainurl } from "../commonfile";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${mainurl}/userroute21/allusers`, {
          withCredentials: true,
        });
        if (response.data && response.data.users) {
          setUsers(response.data.users);
        } else {
          setError("No users found.");
        }
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterRole === "" || user.role === filterRole)
  );

  const admin = users.filter((user) => user.role === "admin").length; 
  const user = users.filter((user) => user.role === "user").length;
  const uniqueRoles = [...new Set(users.map((user) => user.role))];

  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 ring-indigo-700/10",
      user: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 ring-blue-700/10",
      manager: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 ring-emerald-700/10",
      default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-gray-700/10"
    };
    return colors[role.toLowerCase()] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50  to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex md:flex-row md:items-center md:justify-center mt-6 mb-4 gap-4">
          <div className="flex justify-center flex-col items-center" >
            <h1 className="text-3xl font-bold bg-gradient-to-br from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              User Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Monitor and manage user accounts effectively
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Users className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{users.length}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <ArrowUpRight size={16} className="mr-1" />
              <span>12% increase</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <Award className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Admins</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{admin}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <BarChart3 size={16} className="mr-1" />
              <span>Active now</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <Building className="text-emerald-600 dark:text-emerald-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Regular Users</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{user}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400">
              <Calendar size={16} className="mr-1" />
              <span>This month</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <Settings className="text-amber-600 dark:text-amber-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Roles</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{uniqueRoles.length}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Filter size={16} className="mr-1" />
              <span>View all roles</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 outline-none focus:ring-indigo-500 dark:bg-gray-700  dark:text-white focus:border-transparent"
              />
            </div>
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 outline-none dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white focus:border-transparent appearance-none"
              >
                <option value="">All Roles</option>
                {uniqueRoles.map((role) => (
                  <option key={role} value={role} className="dark:bg-gray-800">{role}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-indigo-600 dark:text-indigo-400" size={40} />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-xl text-center">
            {error}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center">
            <Users className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={48} />
            <p className="text-gray-600 dark:text-gray-400">No users found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div 
                key={user._id} 
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <Mail size={14} className="mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                    <button
                      onClick={() => navigate(`/usertodos/${user._id}`)}
                      className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      View Profile
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;