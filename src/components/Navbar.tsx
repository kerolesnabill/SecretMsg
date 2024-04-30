import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Navbar = () => {
  const ctx = useContext(UserContext);

  return (
    <div className="navbar bg-base-100 border border-b-amber-900 md:px-20 lg:px-40">
      <div className="flex-1">
        <a className="btn btn-ghost text-lg sm:text-xl lg:text-2xl" href="/">
          <img className="w-10" src={logo} alt="Secret Msg logo" />
          Secret Msg
        </a>
      </div>
      {ctx?.user ? (
        <div className="navbar-end gap-2">
          <p className="text-sm  sm:text-lg">Hi, {ctx.user.name}</p>
        </div>
      ) : (
        <div className="navbar-end gap-2">
          <Link to="/login" className="btn w-12 h-8 text-xs sm:w-20 sm:text-sm">
            Login
          </Link>
          <Link
            to="/signup"
            className="btn btn-accent w-12 text-xs sm:w-20 sm:text-sm"
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
