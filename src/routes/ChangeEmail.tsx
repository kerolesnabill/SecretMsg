import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangeEmail = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context?.user) navigate("/");
  }, []);

  const emailref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: any) => {
    event.preventDefault();
    const newEmail = emailref.current?.value.trim().toLowerCase();

    setIsLoading(true);
    setError("");

    api
      .put("/user/me/change-email", {
        newEmail,
        password: passwordref.current?.value,
      })
      .then((res) => {
        toast.success(res.data);
        context?.setUser({ ...context.user, email: newEmail });
      })
      .catch((err) =>
        setError(err?.response?.data || "Failed to change the name.")
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mx-auto max-w-screen-lg my-10">
      <h1 className="text-4xl font-bold my-6 text-center">Change Password</h1>
      <form onSubmit={handleChange}>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Email</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            defaultValue={context?.user?.email}
            ref={emailref}
            required
          />

          <label className="label mt-4">
            <span className="label-text text-lg">Write your password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            ref={passwordref}
            required
          />
        </div>
        <p className="text-red-500 ml-2">{error}</p>
        <button
          className="btn btn-secondary mt-4 disabled:disabled"
          disabled={isLoading}
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          Change Email
        </button>
      </form>
    </div>
  );
};

export default ChangeEmail;
