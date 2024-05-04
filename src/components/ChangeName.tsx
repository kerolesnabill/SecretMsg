import { useContext, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import api from "../api";
import { toast } from "react-toastify";

const ChangeName = () => {
  const context = useContext(UserContext);
  const ref = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangeName = (event: any) => {
    event.preventDefault();
    const name = ref.current?.value.trim();
    if (name?.length == 0) {
      setError("Name is requried.");
      return;
    }

    setIsLoading(true);
    setError("");

    api
      .put("/user/me", {
        name,
      })
      .then((res) => {
        toast.success(res.data);
        context?.setUser({ ...context.user, name });
      })
      .catch((err) =>
        setError(err?.response?.data || "Failed to change the name.")
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleChangeName}>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg font-bold">Change Name</span>
        </label>
        <input
          type="text"
          name="name"
          className="input input-bordered"
          minLength={1}
          maxLength={50}
          required
          defaultValue={context?.user?.name}
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

export default ChangeName;
