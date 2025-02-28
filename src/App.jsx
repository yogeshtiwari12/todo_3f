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
import Loading from "./components/loading";

function App() {
  const { profile, isprofile, loading } = useAuth();

  const isAuth = !!profile && !!isprofile;
  console.log("state", isAuth);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-green-50">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Showtodo />} />
          <Route
            path="/addtodo"
            element={isAuth ? <Todo /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={isAuth ? <Allusers /> : <Navigate to="/login" />}
          />

          <Route
            path="/usertodos/:uid"
            element={isAuth ? <UserTodos /> : <Navigate to="/login" />}
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
