import { useNavigate } from "react-router-dom";
import classes from "./BoardPaging.module.css";

function BoardPaging({page, setPage, totalPage}) {

  const maxPageNumbers = 10; // 하단에 표기될 최대 페이지 수
  const startPageNumber = Math.floor(page / maxPageNumbers) * maxPageNumbers; // 맨앞 페이지 번호
  const endPageNumber = Math.min(startPageNumber + maxPageNumbers, totalPage) // 맨마지막에 표시되는 페이지 번호
  const navigate = useNavigate();
  
  const pageNumbers = Array.from(
    {length : endPageNumber - startPageNumber},
    (_, i) => startPageNumber + i
  )

  const pageChangeHandler = (targetPage) => {
    setPage(targetPage);
  } 

  return (
    <>
      <div className={classes.board_paging_container}>
        <div className={classes.click_paging_container}>
          {/* << - 첫 페이지로 가는 버튼 */}
          <div className={`${classes.click_page_button} ${classes.click_page_button_str_wide}`} onClick={() => pageChangeHandler(0)}>{"<<맨앞"}</div>

          {/* << - 이전 페이지로 가는 버튼 */}
          <div className={`${classes.click_page_button} ${classes.click_page_button_str_wide}`} onClick={() => pageChangeHandler(page == 0 ? 0 : page-1)}>{"<이전"}</div>

          {/* 페이징 번호 */}
          {pageNumbers.map((pageNum) => (
            <div className={`${classes.click_page_button} ${classes.click_page_button_num_wide}`} onClick={() => pageChangeHandler(pageNum)}>[{pageNum + 1}]</div>
          ))}

          {/* << - 다음 페이지로 가는 버튼 */}
          <div className={`${classes.click_page_button} ${classes.click_page_button_str_wide}`} onClick={() => pageChangeHandler(page != totalPage-1 ? page+1 : totalPage-1)}>{"다음>"}</div>

          {/* << - 마지막 페이지로 가는 버튼 */}
            <div className={`${classes.click_page_button} ${classes.click_page_button_str_wide}`} onClick={() => pageChangeHandler(totalPage - 1)}>{"맨뒤>>"}</div>

        </div>
      </div>
    </>
  );
}

export default BoardPaging;
