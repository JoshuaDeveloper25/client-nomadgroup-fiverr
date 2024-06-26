import { createContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [currentEvents, setCurrentEvents] = useState([]);

  const [userInfo, setUserInfo] = useState(
    JSON?.parse(localStorage?.getItem("userInfo")) || {}
  );

  axios.defaults.headers.common["Authorization"] = `Bearer ${
    userInfo?.access_token || null
  }`;

  return (
    <AppContext.Provider
      value={{ userInfo, setUserInfo, currentEvents, setCurrentEvents }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;
