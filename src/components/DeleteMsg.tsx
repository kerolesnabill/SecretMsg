import { FC, useState } from "react";
import api from "../api";

const DeleteMsg: FC<{ id: number; onClose: () => void }> = ({
  id,
  onClose,
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = () => {
    setIsloading(true);
    api
      .delete(`message/${id}`)
      .then(() => {
        document.getElementById(id.toString())?.remove();
        const length = document.getElementById("messages-length")!;
        length.textContent = (parseInt(length?.textContent!) - 1).toString();
        onClose();
      })
      .catch((err) =>
        setError(err?.response?.data || "Failed to delete message.")
      )
      .finally(() => setIsloading(false));
  };
  return (
    <div className="mt-6 text-center text-lg">
      <p>Are you sure you want to delete this message permanently?</p>
      <p className="text-red-600 my-2">{error}</p>
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="btn btn-error text-white mt-4 disabled:disabled"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteMsg;
