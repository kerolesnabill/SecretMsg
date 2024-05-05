import { useContext, useRef, useState } from "react";
import userImg from "../assets/user.jpg";
import api from "../api";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

const ChangeImage = () => {
  const context = useContext(UserContext);
  const imageRef: any = useRef<HTMLImageElement>(null);
  const [imageString, setImageString] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUploadImage = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    api
      .put("/user/me", {
        image: imageString,
      })
      .then((res) => {
        toast.success(res.data);
        context?.setUser({ ...context.user, image: imageString });
      })
      .catch((err) =>
        setError(err?.response?.data || "Failed to change the image.")
      )
      .finally(() => setIsLoading(false));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 500;
          canvas.height = 500;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, 500, 500);
          const dataURL = canvas.toDataURL("image/jpeg", 0.6);
          setImageString(dataURL);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setIsLoading(true);
    setError("");

    api
      .put("/user/me", {
        image: "",
      })
      .then(() => {
        toast.success("Image was removed successfully.");
        context?.setUser({ ...context.user, image: null });
      })
      .catch((err) =>
        setError(err?.response?.data || "Failed to remove the image.")
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="my-10 text-center" onSubmit={handleUploadImage}>
      <div className="w-40 md:w-64 mx-auto">
        <img
          className="rounded-full"
          src={context?.user?.image || userImg}
          alt="User image"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        required
        ref={imageRef}
        onChange={handleFileChange}
        className="file-input file-input-bordered mt-4 w-64 sm:w-auto"
      />
      <p className="text-red-500 mt-2">{error}</p>
      <div className="flex justify-center gap-4">
        <button
          type="submit"
          className="btn btn-secondary mt-2 disabled:disabled"
          disabled={!imageRef.current || isLoading}
        >
          {isLoading && <span className="loading loading-spinner"></span>}
          Save
        </button>
        <button
          type="button"
          className="btn btn-primary mt-2 disabled:disabled"
          disabled={isLoading}
          onClick={() => handleRemoveImage()}
        >
          Remove
        </button>
      </div>
    </form>
  );
};

export default ChangeImage;
