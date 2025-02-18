import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Todo from "./components/todo";
import Navbar from "./components/navbar";
import Showtodo from "./components/showtodo";
import Signup from "./components/signup";
import Login from "./components/login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/dashboard/dashboard";
import Allusers from "./components/dashboard/allusers";
import UserTodos from "./components/usertodo";
import { useAuth } from "./components/context";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { profile } = useAuth();

  return profile ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="bg-green-50">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Showtodo />}  />
          <Route path="/addtodo" element={<ProtectedRoute element={<Todo />} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/allusers" element={<ProtectedRoute element={<Allusers />} />} />
          <Route path="/usertodos/:uid" element={<ProtectedRoute element={<UserTodos />} />} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
