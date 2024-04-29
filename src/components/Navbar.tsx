import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 border border-b-amber-900 md:px-20 lg:px-40">
      <div className="flex-1">
        <a className="btn btn-ghost text-lg sm:text-xl lg:text-2xl" href="/">
          <img className="w-10" src={logo} alt="Secret Msg logo" />
          Secret Msg
        </a>
      </div>
      <div className="navbar-end gap-4">
        <a className="btn w-12 h-8 text-xs sm:w-20 sm:text-sm">Login</a>
        <a className="btn btn-accent w-12 text-xs sm:w-20 sm:text-sm">Signup</a>
      </div>
    </div>
  );
};

export default Navbar;
