import React, { createContext, useState, useContext, useEffect } from "react";

const SignupContext = createContext();
export const useSignup = () => useContext(SignupContext);

const LOCAL_KEY = "signupData";

export const SignupProvider = ({ children }) => {
  // Clear saved data on first load / refresh
  useEffect(() => {
    localStorage.removeItem(LOCAL_KEY);
  }, []);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(signupData));
  }, [signupData]);

  return (
    <SignupContext.Provider value={{ signupData, setSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};
