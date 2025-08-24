import React, { useEffect, useState } from "react";
import image from "./img/vertical_bar.svg";
import line1 from "./img/contentLine.svg";
import line2 from "./img/contentLine.svg";
import line3 from "./img/vertical_bar.svg";
import line42 from "./img/vertical_bar.svg";
import line4 from "./img/vertical_bar.svg";
import styles from "./PostReadComponents.module.css";
import vector1 from "./img/recomment.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPostData, getCommentData, commentWrite } from "../../api/postApi";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify"

export const PostReadComponents = () => {
  // 게시글 번호 추출용
  const [searchParams, setSearchParams] = useSearchParams();
  const boardId = Number(searchParams.get("boardId") || 0);
  // 콘텐츠, 댓글정보 가져오기용
  const [contentData, setContentData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  // 댓글 활성화 여부 결정을 위한 jwt토큰 추출용
  const hasJwt = useSelector((store) => Boolean(store.auth.hwanuAccessToken));
  // console.log("hasJwt : ", hasJwt);
  // 댓글내용
  const [commentText, setCommentText] = useState("");
  console.log("작성중인 댓글내용 : ", commentText);

  // 게시글 가져오는 함수
  const fetchPostData = async () => {
    const response = await getPostData(boardId);
    setContentData(response);
    // console.log("ContentData 완료:", response);
  };

  // 게시글 가져오는 함수
  const fetchCommentData = async () => {
    const response = await getCommentData(boardId);
    setCommentData(response);
    // console.log("CommentData 완료:", response);
    // console.log("Comment 수량 ", response.length);
  };

  // 마운트 시 1번만 실행
  useEffect(() => {
    if (boardId) {
      fetchCommentData();
      fetchPostData();
    }
  }, []);


  if (!contentData || !commentData) {
    return null;
  }

  return (
    // <div className={styles.board_container}></div>
    <div className={styles.frame}>
      <div className={styles.div}>
        <div className={styles["div-2"]}>
          <Content contentData={contentData} />
          <div className={styles["div-5"]}>
            <div className={styles["view-4"]}>
              <div className={styles["text-wrapper-5"]}>댓글</div>
              <div className={styles["div-wrapper-2"]}>
                <div className={styles["text-wrapper-3"]}>
                  [{commentData.length}]
                </div>
              </div>
            </div>

            <div className={styles["view-5"]}>
              {/* 댓글 ------------------------------ */}
              {commentData.map((comment) => (
                <React.Fragment key={comment.commentId}>
                  <Comment comment={comment} /> {/* JSX 컴포넌트 반환 */}
                  <ReComment recomments={comment.recomment} />
                </React.Fragment>
              ))}
              {/* 댓글 ------------------------------ */}
            </div>
          </div>

          <NewComment {...{hasJwt, commentText, setCommentText, boardId, fetchCommentData}}></NewComment>

          <div className={styles["div-10"]}>
            <div className={styles["div-wrapper-7"]}>
              <div className={styles["text-wrapper-3"]}>목록으로</div>
            </div>
            <div className={styles["div-wrapper-8"]}>
              <div className={styles["text-wrapper-3"]}>글쓰기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostReadComponents;

function Content({ contentData }) {
  return (
    <>
      <div className={styles["div-3"]}>
        <div className={styles["text-wrapper-2"]}>{contentData.title}</div>
        <div className={styles["div-4"]}>
          <div className={styles.view}>
            <div className={styles["text-wrapper-3"]}>작성자 |</div>
            <div className={styles["div-wrapper"]}>
              <div className={styles["text-wrapper-4"]}>
                {contentData.nickname}
              </div>
            </div>
          </div>
          <div className={styles.view}>
            <div className={styles["text-wrapper-3"]}>조회수 |</div>
            <div className={styles["div-wrapper"]}>
              <div className={styles["text-wrapper-4"]}>
                {contentData.viewCnt}
              </div>
            </div>
          </div>
          <div className={styles.view}>
            <div className={styles["text-wrapper-3"]}>작성일 |</div>
            <div className={styles["div-wrapper"]}>
              <div className={styles["text-wrapper-4"]}>
                {contentData.createdAt === contentData.updatedAt
                  ? contentData.updatedAt
                  : contentData.updatedAt + " (수정됨)"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["view-2"]}>
        <img className={styles.line} alt="Line" src={line1} />
        <div className={styles["view-3"]}>
          <div className={styles.p}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contentData.content) }}/>
        </div>
        <img className={styles.img} alt="Line" src={line2} />
      </div>
    </>
  );
}

function Comment({ comment }) {
  return (
    <div className={styles["view-6"]}>
      <div className={styles["div-6"]}>
        <div className={styles["text-wrapper-6"]}>{comment.nickname}</div>
        <div className={styles["text-wrapper-7"]}>대댓글</div>
        <img className={styles["line-2"]} alt="Line" src={line42} />
        <div className={styles["text-wrapper-8"]}>수정</div>
        <img className={styles["line-2"]} alt="Line" src={image} />
        <div className={styles["text-wrapper-8"]}>삭제</div>
      </div>
      <div className={styles["div-wrapper-3"]}>
        <p
          className={styles.p}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(comment.content),
          }}
        />
      </div>
    </div>
  );
}

function ReComment({ recomments }) {
  // console.log("recomment :: ", recomments);
  return (
    <>
      {recomments.map((recomment) => (
        // {console.log("recomment :::",recomment)}
        <React.Fragment key={recomment.commentId}>
        <div className={styles["frame-wrapper"]}>
          <div className={styles["div-7"]}>
            <div className={styles["div-8"]}>
              <img className={styles.vector} alt="Vector" src={vector1} />
              <div className={styles["div-9"]}>
                <div className={styles["text-wrapper-10"]}>
                  {recomment.nickname}
                </div>
                <div className={styles["text-wrapper-7"]}>대댓글</div>
                <img className={styles["line-2"]} alt="Line" src={line4} />
                <div className={styles["text-wrapper-8"]}>수정</div>
                <img className={styles["line-2"]} alt="Line" src={line3} />
                <div className={styles["text-wrapper-8"]}>삭제</div>
              </div>
            </div>
            <div className={styles["div-wrapper-4"]}>
              <p className={styles["text-wrapper-9"]}>{recomment.content}</p>
            </div>
          </div>
        </div>
        </React.Fragment>
      ))}
    </>
  );
}

function NewComment({ hasJwt, commentText, setCommentText, boardId, fetchCommentData}) {

  const { email, memberId, nickname } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const CommentWriteHandler = async() => {
    if (!hasJwt) {
      alert("댓글 작성은 로그인이 필요한 서비스입니다.")
      // navigate("/login");
    }
    await commentWrite(boardId, commentText, email, memberId, nickname);
    await fetchCommentData();
    setCommentText("");
  }

  return (
    <div className={styles["overlap-group-wrapper"]}>
      <div className={styles["overlap-group"]}>
        <div className={styles["div-wrapper-5"]}>
          {hasJwt ? (
            <textarea
              className={styles["text-wrapper-11"]}
              placeholder="댓글을 남겨주세요."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
          ) : (
            <p className={styles["text-wrapper-11"]}>
              댓글은 로그인이 필요한 서비스 입니다.
            </p>
          )}
        </div>
        <div onClick={CommentWriteHandler} className={styles["div-wrapper-6"]}>
          <div className={styles["text-wrapper-12"]}>댓글쓰기</div>
        </div>
      </div>
    </div>
  );
}
