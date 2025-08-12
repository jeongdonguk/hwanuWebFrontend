import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BoardList from "./BoardList"
import BoardSearch from "./BoardSearch";
import BoardPaging from "./BoardPaging";
import PenButton from "../post/PostPenButton"

function Board() {

  // const hasJwt = useSelector((s) => Boolean(s.auth.hwanuAccessToken));
  // console.log("hasJwt :",hasJwt);
  
  // const [page, setPage] = useState(0); // 페이지번호
  const [searchParams, setSearchParams] = useSearchParams(); // url입력파라미터 정의
  const page = Number(searchParams.get("page") || 0); // 숫자형태의 페이지 값을 가져옴/ 없으면 기본값 0
  
  const setPage = (newPage) => {
    setSearchParams({ page: newPage});
  }; // 파라미터 변경 함수

  const [totalPage, setTotalPage] = useState(1); // 페이지번호
  // console.log('로그인 여부 : ',hasJwt);
  console.log('현재 페이지 :',page);
  console.log(document.cookie);
  return (
    <div>
      <BoardSearch />
      <BoardList {...{page, setPage, setTotalPage}}></BoardList>
      <BoardPaging {...{page, setPage, totalPage}} />
      <PenButton></PenButton>
    </div>

  );
}

export default Board;
