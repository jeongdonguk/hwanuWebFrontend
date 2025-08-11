import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import hwanu_img from "./hwanu.png";
import hwanu_text from "./hwanuMainText.png";
import search_icon from "./search_icon.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/authActions";
import { logoutSuccess } from "../../store/auth/authSlice";

const HeaderTop = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const userEmail = useSelector((state) => state.auth.email);

  const dispatch = useDispatch();

  const logoutHandle = async () => {
    console.log(userEmail)
    if (!userEmail) {
      dispatch(logoutSuccess());
      alert("로그인 정보가 없습니다.");
      return;
    }
    console.log("로그아웃 요청 데이터:", { email: userEmail });
    await dispatch(logout(userEmail)); // 이메일을 포함하여 로그아웃 요청
    // alert("로그아웃 완료!");
      // 강제로 전체 페이지 새로고침
    // window.location.href = "/login";
    // navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };



  useEffect(() => {
    console.log("현재 Redux 상태:", isLogin);
    console.log(userEmail);
  }, [isLogin, userEmail]); // 상태가 변경될 때마다 출력
  
  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate('/login');
  //   }
  // }, [isLogin])


  return (
    <>
      <div className={classes.header_container}>
        <div className={classes.header_sub_container}>
          <div className={classes.hwanu_img} onClick={() => navigate("/")}>
            <img src={hwanu_img} />
          </div>
          <div className={classes.hwanu_text} onClick={() => navigate("/")}>
            <img src={hwanu_text} />
          </div>
          <div className={classes.search_box}>
            <div className={classes.search_icon}>
              <img src={search_icon} />
            </div>
          </div>
          {isLogin ? (
            <div onClick={logoutHandle} className={classes.login_text} >
              {userEmail} 
              로그아웃
            </div>
          ) : (
            <div
              className={classes.login_text}
              onClick={() => navigate("/login")}
            >
              로그인 | 회원가입
            </div>
          )}
        </div>
        <div className={classes.search_bottom_container}>
          <div className={classes.click_button}>
            <div className={classes.click_button_text}>자유게시판</div>
          </div>
          <div className={classes.click_button}>
            <div className={classes.click_button_text}>갤러리</div>
          </div>
          <div className={classes.click_button}>
            <div className={classes.click_button_text}>뉴스</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
