import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/auth/authActions";
import AppRoutes from "./routes";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenCheck = async () => {
      const result = await dispatch(checkAuth()); // 앱이 실행될 때 로그인 상태 체크
      if (result === 'EXPIRED') {
        alert("로그인이 만료되어 홈으로 이동합니다.");
        navigate("/");      
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
