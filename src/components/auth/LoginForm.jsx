import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authActions"; // Redux 액션 가져오기
import { useLocation, useNavigate } from "react-router-dom"; // 로그인 후 이동하기 위해 필요
import "./auth.css"; // 로그인 스타일 적용
import authTopImg from "./auth_top_img.png";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // 이전 페이지로 돌아가기위해
  const location = useLocation();
  const from = location.state?.from ;

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    setError(""); // 에러 초기화

    try {
      await dispatch(login(email, password)); // Redux 로그인 액션 실행
      if (from) {
        navigate(from.pathname + from.search + from.hash , { replace : true }); // 로그인 성공 후 홈으로 이동
      } else {
        navigate('/', { replace : true })
      }
    } catch (err) {
      setError(err.response?.data?.message || "로그인 실패"); // 백엔드 에러 메시지 표시
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-container">
        <div className="auth_img" onClick={() => navigate("/")}>
          <img src={authTopImg}></img>
        </div>
        <div className="id_input_border">
          <input
            className="input-field"
            type="email"
            // name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="아이디 입력"
          />
        </div>
        <div className="pw_input_border">
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
          />
        </div>
        <button type="submit" className="login_button">
          로그인
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
