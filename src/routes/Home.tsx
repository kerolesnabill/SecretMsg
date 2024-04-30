import { useContext } from "react";
import UserContext from "../context/UserContext";
import Profile from "../components/Profile";

const Home = () => {
  const contxet = useContext(UserContext);
  return <>{contxet?.user ? <Profile /> : <div>Home</div>}</>;
};

export default Home;
