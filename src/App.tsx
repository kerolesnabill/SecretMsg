import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container mx-auto px-4" id="detail">
        <Outlet />
      </main>
    </>
  );
}

export default App;
