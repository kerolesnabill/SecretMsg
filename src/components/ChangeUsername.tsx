import { useContext, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import api from "../api";
import { toast } from "react-toastify";

const ChangeUsername = () => {
  const context = useContext(UserContext);
  const ref = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: any) => {
    event.preventDefault();
    const username = ref.current?.value.trim().toLowerCase();

    setIsLoading(true);
    setError("");

    api
      .put("/user/me/change-username", {
        username,
      })
      .then((res) => {
        toast.success(res.data);
        context?.setUser({ ...context.user, username });
      })
      .catch((err) =>
        setError(err?.response?.data || "Failed to change the username.")
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleChange} className="mt-10">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg font-bold">
            Change Username
            <span className="font-normal">
              {` (${location.host}/${context?.user?.username})`}
            </span>
          </span>
        </label>
        <input
          type="text"
          name="name"
          className="input input-bordered"
          minLength={3}
          maxLength={50}
          required
          defaultValue={context?.user?.username}
          ref={ref}
        />
      </div>
      <p className="text-red-500 ml-2">{error}</p>
      <button
        className="btn btn-secondary mt-2 disabled:disabled"
        disabled={isLoading}
      >
        {isLoading && <span className="loading loading-spinner"></span>}
        Save
      </button>
    </form>
  );
};

export default ChangeUsername;
