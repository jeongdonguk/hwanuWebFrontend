import classes from "./BoardSearch.module.css";

function BoardSearch() {
  return (
    <>
      <div className={classes.board_search_container}>
        <div className={classes.click_button_container}>
          <div className={classes.click_button}>전체</div>
          <div className={classes.click_button}>인기글</div>
          <div className={classes.click_button}>내가 쓴 글</div>
        </div>
        <div className={classes.search_box}>
            <div className={classes.search_box_title}>제목</div>
        </div>
      </div>
    </>
  );
}

export default BoardSearch;
