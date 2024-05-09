import { useContext } from "react";
import UserContext from "../context/UserContext";
import Profile from "../components/Profile";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  const contxet = useContext(UserContext);
  return (
    <>
      {contxet?.user ? (
        <Profile />
      ) : (
        <div className="text-center my-10">
          <div className="mx-auto w-40">
            <img src={logo} alt="SecretMsg logo" />
          </div>
          <h1 className="text-4xl">
            Welcome to <span className="font-bold">SecretMsg</span>
          </h1>
          <p className="text-lg mt-8">
            Where honest feedback meets anonymity. Create your profile, invite
            others to share their thoughts, and receive anonymous messages that
            spark insight or intrigue. Whether it's compliments, constructive
            criticism, or heartfelt confessions, discover what others truly
            think, all while safeguarding their anonymity.
          </p>
          <Link to="/signup" className="btn btn-primary px-8 my-10">
            SIGN UP NOW
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
