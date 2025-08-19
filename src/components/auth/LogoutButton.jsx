import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authActions";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.email);

  const handleLogout = () => {
    console.log(user)
    if (!user) {
      alert("로그인 정보가 없습니다.");
      return;
    }
    console.log("로그아웃 요청 데이터:", { email: user });

    dispatch(logout(user)); // 이메일을 포함하여 로그아웃 요청
    // alert("로그아웃 완료!");
    // navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
