import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log('User state in context:', user);
  useEffect(() => {
    if (user === null && loading === true) {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/profile`)
        .then(({ data }) => {
          // console.log('User data from profile:', data);
          if (data && Object.keys(data).length > 0) {
            setUser(data);
          } else {
            setUser(null);
          }
        })
        .catch((error) => {
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (user !== null && loading === true) {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
