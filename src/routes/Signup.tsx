import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Signup = () => {
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [isLoding, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (nameRef.current?.value.trim().length == 0) {
      setError("Name is required.");
      return;
    }

    setIsLoading(true);
    setError("");

    await api
      .post("/signup", {
        name: nameRef.current?.value.trim(),
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      })
      .then((res) => {
        localStorage.setItem("token", res.data);
        navigate("/");
      })
      .catch((err) => setError(err?.response?.data || "Unexpected error."))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="card w-full max-w-sm shadow-lg bg-base-100 mx-auto mt-20">
      <div className="card-header text-center">
        <h1 className="text-xl font-bold">Sign Up</h1>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered"
              minLength={1}
              maxLength={50}
              required
              ref={nameRef}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered"
              maxLength={255}
              required
              ref={emailRef}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered"
              minLength={8}
              maxLength={255}
              required
              ref={passwordRef}
            />
          </div>
          <p className="mt-4 text-error">{error}</p>
          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn btn-primary disabled:disabled"
              disabled={isLoding}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          You already have an account{" "}
          <Link className="link link-info" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
