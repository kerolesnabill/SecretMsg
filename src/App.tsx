import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserContext, { NullableUser } from "./context/UserContext";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import api from "./api";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState<NullableUser>(null);

  const updateLastSeen = () => {
    api.put("user/me/last-seen");
  };

  useEffect(() => {
    api
      .get("/user/me")
      .then((res) => {
        setUser(res.data);
        updateLastSeen();
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <header>
        <Navbar />
      </header>
      <main className="container mx-auto px-4" id="detail">
        <Outlet />
      </main>
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default App;
