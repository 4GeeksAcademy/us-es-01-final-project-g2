import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      return false;

    }
    const userObj = JSON.parse(user);
    const userId = userObj.id;

    const request = await fetch(Global.url + "user/profile" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
    const data = await request.json();

    setAuth(data.user);
  }



  return (
    <Auth.Provider
      value={{
        auth,
        setAuth
        
      }}
    >
      {children}
    </Auth.Provider>
  );
};


export default AuthContext

