import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Signup from "./routes/Signup.tsx";
import Login from "./routes/Login.tsx";
import Home from "./routes/Home.tsx";
import Settings from "./routes/Settings.tsx";
import ChangeEmail from "./routes/ChangeEmail.tsx";
import ChangePassword from "./routes/ChangePassword.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/settings", element: <Settings /> },
      { path: "/change-email", element: <ChangeEmail /> },
      { path: "/change-password", element: <ChangePassword /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
