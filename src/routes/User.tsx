import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import ErrorPage from "../components/ErrorPage";
import { toast } from "react-toastify";

const User = () => {
  const { username } = useParams();
  const [user, setUser]: any = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`user/${username}`)
      .then((res) => {
        setUser(res.data);
        updateUserViews(res.data.id);
      })
      .catch()
      .finally(() => setIsLoading(false));
  }, []);

  const updateUserViews = (id: number) => {
    if (localStorage.getItem(id.toString())) return;

    api
      .put(`/user/update-views/${id}`)
      .then(() => localStorage.setItem(id.toString(), "1"));
  };

  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [sendMessageIsLoading, setSendMessageIsLoading] = useState(false);
  const [sendMessageError, setSendMessageError] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setSendMessageIsLoading(true);
    setSendMessageError("");

    api
      .post("/message", {
        userId: user?.id,
        body: messageRef.current?.value,
      })
      .then(() => {
        toast.success("The message was sent successfully.");
        formRef.current?.reset();
      })
      .catch((err) =>
        setSendMessageError(
          err?.response?.data || "Error while sending the message"
        )
      )
      .finally(() => setSendMessageIsLoading(false));
  };

  return (
    <>
      {isLoading && <p className="text-2xl text-center mt-40">Loading...</p>}
      {!user && !isLoading && <ErrorPage />}
      {user && (
        <div className="min-h-screen shadow-md py-10 max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 shadow-sm sm:grid-cols-2 p-4">
            <div className="w-40 md:w-56 mx-auto">
              <img
                className="rounded-full"
                src={user?.image}
                alt="User image"
              />
              {user.lastSeen && (
                <div className="text-center">
                  <p className="font-bold">Last seen:</p>
                  <p>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(user.lastSeen))}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-8 text-center mx-auto sm:text-left sm:mx-0 md:mt-16">
              <p className="text-lg font-bold">{user?.name}</p>
              <p className="">@{user?.username}</p>
              <p className="mt-4 sm:ml-2">{user?.bio}</p>
            </div>
          </div>

          <form
            onSubmit={handleSendMessage}
            ref={formRef}
            className="mt-20 mx-auto text-center"
          >
            <h3 className="text-center text-lg font-bold italic">
              Send an anonymous message to {user?.name}
            </h3>

            <textarea
              className="textarea textarea-bordered w-11/12 mt-8 text-lg"
              placeholder="Write a message..."
              rows={10}
              required
              minLength={1}
              maxLength={1000}
              ref={messageRef}
              onChange={(e) => setMessageLength(e.target.value.length)}
            ></textarea>
            <p className="text-right mt-2 mr-8">{messageLength}/1000</p>
            <p className="text-center text-error text-lg mb-4">
              {sendMessageError}
            </p>
            <button type="submit" className="btn btn-secondary">
              {sendMessageIsLoading && (
                <span className="loading loading-spinner"></span>
              )}
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default User;
