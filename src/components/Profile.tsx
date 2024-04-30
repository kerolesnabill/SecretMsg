import { useContext, useEffect, useState } from "react";
import userImg from "../assets/user.jpg";
import UserContext from "../context/UserContext";
import shareIcon from "../assets/icons/share.svg";
import copyIcon from "../assets/icons/copy.svg";
import eyeIcon from "../assets/icons/eye.svg";
import api from "../api";

const Profile = () => {
  const contxet = useContext(UserContext);
  const userUrl = window.location.href + contxet?.user?.username;

  const [messages, setMessages] = useState<[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    api
      .get("/message")
      .then((res: any) => {
        setMessages(res.data);
      })
      .catch((err) =>
        setError(err?.response?.data || "Failed to get Messages")
      );
  }, []);

  return (
    <div className="min-h-screen shadow-md py-10 max-w-screen-lg mx-auto">
      <div className="flex justify-center mb-10 gap-2">
        <img className="w-6" src={eyeIcon} alt="Views icon" />
        <p className="text-green-600 font-bold">
          Views: {contxet?.user?.views}
        </p>
      </div>
      <div className="grid grid-cols-1 shadow-sm sm:grid-cols-2 p-4">
        <div className="w-56 md:w-64 mx-auto">
          <img className="rounded-full" src={userImg} alt="User image" />
        </div>
        <div className="mt-8 text-center mx-auto sm:text-left sm:mx-0 md:mt-16">
          <p className="text-lg font-bold">{contxet?.user?.name}</p>
          <p className="">@{contxet?.user?.username}</p>
          <p className="mt-4 sm:ml-2">{contxet?.user?.bio || "... bio ..."}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-2 shadow-sm text-center">
        <p className="mt-4">{userUrl}</p>
        <div className="flex justify-center mt-2 mb-4 gap-4 sm:mt-0">
          <button
            className="btn btn-secondary"
            onClick={() => navigator.clipboard.writeText(userUrl)}
          >
            <img className="w-4" src={copyIcon} alt="Copy icon" />
            copy
          </button>
          <button className="btn btn-primary">
            <img className="w-4" src={shareIcon} alt="Share icon" />
            share
          </button>
        </div>
      </div>

      <p className="text-center text-error text-lg mt-6">{error}</p>
      <div className="mt-20">
        <h3 className="text-center font-bold">
          Your Messages ({messages.length})
        </h3>
        {messages && messages.length > 0 ? (
          messages.map((msg: any) => (
            <div className="m-4 mt-8" id={msg.Id.toString()} key={msg.Id}>
              <p className="text-accent font-bold ml-2">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(msg.CreatedAt))}
              </p>
              <p className="bg-base-200 p-6 rounded-lg">{msg.Body}</p>
            </div>
          ))
        ) : (
          <p className="text-center mt-6">No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
