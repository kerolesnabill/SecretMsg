import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Navbar = () => {
  const ctx = useContext(UserContext);

  const handleSignout = () => {
    localStorage.removeItem("token");
    ctx?.setUser(null);
    window.location.assign("/");
  };

  return (
    <div className="navbar bg-base-100 border border-b-amber-900 md:px-20 lg:px-40">
      <div className="flex-1">
        <a className="btn btn-ghost text-lg sm:text-xl lg:text-2xl" href="/">
          <img className="w-10" src={logo} alt="Secret Msg logo" />
          Secret Msg
        </a>
      </div>
      {ctx?.user ? (
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Menu</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li>
                    <button onClick={() => handleSignout()}>Log out</button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
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
