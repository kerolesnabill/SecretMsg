import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context?.user) navigate("/");
  }, []);

  const passwordref = useRef<HTMLInputElement>(null);
  const newPasswordref = useRef<HTMLInputElement>(null);
  const confirmNewPasswordref = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: any) => {
    event.preventDefault();
    if (newPasswordref.current?.value != confirmNewPasswordref.current?.value) {
      setError("Confirm password is different than new password");
      return;
    }

    setIsLoading(true);
    setError("");

    api
      .put("/user/me/change-password", {
        currentPassword: passwordref.current?.value,
        newPassword: newPasswordref.current?.value,
      })
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) =>
        setError(err?.response?.data || "Failed to change the password.")
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mx-auto max-w-screen-lg my-10">
      <h1 className="text-4xl font-bold my-6 text-center">Change Password</h1>
      <form onSubmit={handleChange}>
        <div className="form-control">
          <label className="label mt-4">
            <span className="label-text text-lg">Current password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            ref={passwordref}
            required
          />
          <label className="label mt-4">
            <span className="label-text text-lg">New password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            ref={newPasswordref}
            minLength={8}
            maxLength={255}
            required
          />
          <label className="label mt-4">
            <span className="label-text text-lg">Confirm new password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            ref={confirmNewPasswordref}
            required
          />
        </div>
        <p className="text-red-500 ml-2">{error}</p>
        <button
          className="btn btn-primary mt-4 disabled:disabled"
          disabled={isLoading}
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
