import {Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Post from "../pages/Post";
import PostRead from "../pages/PostRead";
// import ReviewInput from "../components/postRead/ReviewInput";
// import PostReadComponent from "../components/postRead/PostReadComponents";


const titles = {
  "/": "화정누리마을",
  "/login": "로그인",
  "/signup": "회원가입",
  "/post": "글쓰기",
};

const AppRoutes = () => {

  const location = useLocation();

  useEffect(() => {
    const title = titles[location.pathname];
    document.title = title ? title : "화정누리마을";
  }, [location])

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<Post />} />
        <Route path="/postRead" element={<PostRead />} />
        {/* <Route path="/test" element={<PostReadComponent />} /> */}
      </Routes>
  );
};

export default AppRoutes;
