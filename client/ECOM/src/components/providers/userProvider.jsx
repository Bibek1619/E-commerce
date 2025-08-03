import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Automatically fetch user on first mount if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    refreshUser();
  }, []);

  // Called after login or when token exists
  const refreshUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      setUser(response.data.user);
    } catch (error) {
      console.error("User not authenticated:", error);
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{ user, loading, updateUser, clearUser, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
