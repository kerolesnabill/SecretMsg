import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import api from "../api";
import { toast } from "react-toastify";

const ChangeCheckbox = () => {
  const context = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangeAvailable = () => {
    setIsLoading(true);
    setError("");

    api
      .put("/user/me", { available: !context?.user?.available })
      .then((res) => {
        toast.success(res.data);
        context?.setUser({
          ...context.user,
          available: !context.user?.available,
        });
      })
      .catch((err) => setError(err?.response?.data || "Unexpected error."))
      .finally(() => setIsLoading(false));
  };

  const handleChangeShowLastSeen = () => {
    setIsLoading(true);
    setError("");

    api
      .put("/user/me", { showLastSeen: !context?.user?.showLastSeen })
      .then((res) => {
        toast.success(res.data);
        context?.setUser({
          ...context.user,
          showLastSeen: !context.user?.showLastSeen,
        });
      })
      .catch((err) => setError(err?.response?.data || "Unexpected error."))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 text-lg font-bold">
        <div className="flex gap-2">
          <p>Available to receive messages</p>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            checked={context?.user?.available}
            disabled={isLoading}
            onChange={() => handleChangeAvailable()}
          />
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <p>Show your last seen</p>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            disabled={isLoading}
            checked={context?.user?.showLastSeen}
            onChange={() => handleChangeShowLastSeen()}
          />
        </div>
      </div>
      <div className="text-center mt-4">
        {isLoading && <span className="loading loading-spinner"></span>}
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
};

export default ChangeCheckbox;
