import { useContext, useRef, useState } from "react";
import UserContext from "../context/UserContext";
import api from "../api";
import { toast } from "react-toastify";

const ChangeBio = () => {
  const context = useContext(UserContext);
  const ref = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangeName = (event: any) => {
    event.preventDefault();
    const bio = ref.current?.value.trim();

    setIsLoading(true);
    setError("");

    api
      .put("/user/me", {
        bio,
      })
      .then((res) => {
        toast.success(res.data);
        context?.setUser({ ...context.user, bio });
      })
      .catch((err) =>
        setError(err?.response?.data || "Failed to change the bio.")
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={handleChangeName} className="mt-10">
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg font-bold">Bio</span>
        </label>
        <textarea
          className="textarea textarea-bordered"
          maxLength={255}
          defaultValue={context?.user?.bio}
          ref={ref}
          rows={5}
        ></textarea>
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

export default ChangeBio;
