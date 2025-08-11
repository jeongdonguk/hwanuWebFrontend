import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css"; // 스타일 적용

const API_URL = "http://localhost:5000/api/auth"; // 백엔드 API 주소

const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post(`${API_URL}/signup`, { email, password }, { withCredentials: true });
      alert("회원가입 성공! 로그인 해주세요.");
      navigate("/login"); // 회원가입 후 로그인 페이지로 이동
    } catch (err) {
      setError(err.response?.data?.message || "회원가입 실패");
    }
  };

  return (
    <div className="auth-container">
      <h2>회원가입</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignupForm;
