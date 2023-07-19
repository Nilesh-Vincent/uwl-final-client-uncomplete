import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseURL from "../utils/BaseURL";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoading: false,
  error: null,
  onLogout: () => {},
  onLogin: (email, password) => {},
  onSignup: (name, email, password, passwordConfirm) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);  
  const [token, setToken] = useState('');


  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "false") {
      setIsLoggedIn(false);
    }
    if (storedUserLoggedInInformation === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    setIsLoading(true);

    axiosInstance
      .post("/user/logout", {
        withCredentials: true, // Enable sending cookies
      })
      .then((response) => {
        console.log("Logout successful!");
        localStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
        setError(null);
        setIsLoading(false);
        // Perform any additional actions after successful logout
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        setError(error);
        setIsLoading(false);
      });
  };

  const loginHandler = (email, password) => {
    setIsLoading(true);

    axios
      .post(
        `${BaseURL}/api/v1/user/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Enable sending cookies
        }
      )
      .then((response) => {
        console.log("Login successful!");
        console.log(response.data);

        if (response.data.status === "success") {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          setError(null);
        } else {
          setIsLoggedIn(false);
          localStorage.setItem("isLoggedIn", "false");
          setError(new Error("Login failed"));
        }

        setIsLoading(false);
        // Perform any additional actions after successful login
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError(error);
        setIsLoading(false);
      });
  };

  const signupHandler = (name, email, password, passwordConfirm) => {
    setIsLoading(true);

    axios
      .post(
        `${BaseURL}/api/v1/user/signup`,
        {
          name: name,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("SignUp successful!");
        console.log(response.data);

        if (response.data.status === "success") {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          setError(null);
        } else {
          setIsLoggedIn(false);
          localStorage.setItem("isLoggedIn", "false");
          setError(new Error("SignUp failed"));
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("SignUp failed:", error);
        setError(error);
        setIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isLoading: isLoading,
        error: error,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignup: signupHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
