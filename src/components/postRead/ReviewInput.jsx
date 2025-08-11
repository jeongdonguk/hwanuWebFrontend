import React from "react";
import classes from "./ReviewInput.module.css";

export const ReviewInput = () => {
  return (
<div className={classes.frame} data-model-id="8:6">
  <div className={classes['overlap-group']}>
    <div className={classes['div-wrapper']}>
      <p className={classes['text-wrapper']}>
        댓글은 로그인이 필요한 서비스 입니다.
      </p>
    </div>

    <div className={classes.div}>
      <div className={classes['text-wrapper-2']}>댓글쓰기</div>
    </div>
  </div>
</div>

  );
};

export default ReviewInput;