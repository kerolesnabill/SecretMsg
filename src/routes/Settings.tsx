import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import ChangeName from "../components/ChangeName";
import ChangeUsername from "../components/ChangeUsername";
import ChangeBio from "../components/ChangeBio";
import ChangeCheckbox from "../components/ChangeCheckbox";
import ChangeImage from "../components/ChangeImage";

const Settings = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context?.user) navigate("/");
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg my-10">
      <h1 className="text-4xl font-bold my-6 text-center">Settings</h1>
      <ChangeImage />
      <ChangeName />
      <ChangeUsername />
      <ChangeBio />
      <ChangeCheckbox />

      <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2">
        <Link to="/change-email" className="btn btn-secondary">
          Change Email
        </Link>
        <Link to="/change-password" className="btn btn-primary">
          Change Password
        </Link>
      </div>
    </div>
  );
};

export default Settings;
