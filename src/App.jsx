import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/auth/authActions";
import AppRoutes from "./routes";
import { useLocation, useNavigate } from "react-router-dom";

// 로그인이 필요한 페이지를 그냥 접속했을때 보내야할 페이지
const redirectMap = {
  "/post" : "/login"
}

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tokenCheck = async () => {
      const result = await dispatch(checkAuth()); // 앱이 실행될 때 로그인 상태 체크
      // console.log("로그인 상태 점검 : ", result);
      if (!result && location.pathname in redirectMap) {
        alert("로그인이 필요한 페이지 입니다.");
        navigate(redirectMap[location.pathname], { state : {from : location}});      
      }
    };
    tokenCheck();
    
  }, [dispatch, navigate]);

  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;
