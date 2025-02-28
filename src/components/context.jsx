import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { mainurl } from "./commonfile";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [todos, settodos] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isprofile, setIsProfile] = useState(false);
 
  
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const response = await axios.get(`${mainurl}/userroute21/getauthuser`, {
          withCredentials: true,
        });
  
        if (response.data?.user) { // ✅ Check if user exists
          setProfile(response.data.user);
          setIsProfile(true);
        } else {
          setProfile(null);
          setIsProfile(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        setProfile(null);
        setIsProfile(false);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMyProfile();
  }, []);


  useEffect(() => {
    if (!profile) return;
    // console.log(profile.id) 

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${mainurl}/userroute21/allusertodo/${profile.id}`,{withCredentials:true}
        );
        settodos(response.data.todos);
        console.log(response.data.todos)
        console.log("Todos:", response.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error.message);
        settodos(null);
      }
    };

    fetchData();
  }, [profile]);

  return (
    <AuthContext.Provider value={{ todos, profile,loading ,isprofile}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
