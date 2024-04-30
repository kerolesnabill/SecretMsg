import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import UserContext, { NullableUser } from "./context/UserContext";
import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [user, setUser] = useState<NullableUser>(null);

  useEffect(() => {
    api
      .get("/user/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.clear();
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
    </UserContext.Provider>
  );
}

export default App;
