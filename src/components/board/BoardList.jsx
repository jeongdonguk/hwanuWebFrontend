import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchBoardList, fetchPublicBoardList } from "../../api/board";
import classes from "./BoardList.module.css";

function BoardList({hasJwt, page, setTotalPage}) {

  // 게시글 가져올때 사용할 api 결정
  const fetchBoards = async () => {
    return hasJwt
      ? await fetchBoardList(page, 10)
      : await fetchPublicBoardList();
  };

  // 페이지 변경시마다 게시글 리스트 새로 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey : ["boardList", hasJwt, page],
    queryFn : fetchBoards,
    keepPreviousData: true // 신규데이터 로딩시 기존데이터 잠시 유지
  });


  useEffect(() => {
    if (data) {
      setTotalPage(data.totalPages);
    }
  }, [data, setTotalPage])

  if (isLoading) return <p>게시글 데이터 가져오는 중</p>
  if (error) return <p>게시글 가져오기 장애 : {error.message}</p>
  if (!data) return null;

  const boards = data.content;
  const boardsCnt = data.totalElements;
  

  return (
    <div className={classes.board_container}>
      <div className={classes.board_cnt_container}>총&nbsp;&nbsp;<span style={{color : "red"}}>{boardsCnt}</span>개의 게시글이 있습니다.</div>
      <div className={classes.board_top_line}></div>
      <div className={classes.board_table_container}>
      <table className={classes.board_table}>
  <thead>
    <tr>
      <th>번호</th>
      <th>제목</th>
      <th>글쓴이</th>
      <th>등록일</th>
      <th>좋아요</th>
      <th>조회수</th>
    </tr>
  </thead>
  <tbody>
    {boards.map(board => (
      <tr key={board.boardId}>
        <td>{board.boardId}</td>
        <td>{board.title}</td>
        <td>{board.nickname}</td>
        <td>{board.likeCnt}</td>
        <td>{board.likeCnt}</td>
        <td>{board.viewCnt}</td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
    </div>
  );
}

export default BoardList;
