import LogoutButton from "../components/auth/LogoutButton";
import Header from "../components/header/Header";
import PostToast from "../components/post/PostToast"

import "../index.css";

const Home = () => {
  return (
    <>
      <div className="container">
        <Header></Header>
        <PostToast></PostToast>
      </div>
    </>
  );
};

export default Home;
