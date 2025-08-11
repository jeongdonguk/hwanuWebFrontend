import LogoutButton from "../components/auth/LogoutButton";
import Header from "../components/header/Header";
import BoardTop from "../components/board_top/BoardTop";
// import BoardSearch from "../components/board_search/BoardSearch";
import Board from "../components/board/Board";
import "../index.css";

const Home = () => {
  return (
    <>
      <div className="container">
        <Header></Header>
        <BoardTop></BoardTop>
        <Board></Board>
      </div>
    </>
  );
};

export default Home;
