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
import ErrorPage from "./components/ErrorPage.tsx";
import User from "./routes/User.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/:username", element: <User /> },
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
