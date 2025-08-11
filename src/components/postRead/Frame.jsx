import React from "react";
import styles from "./Frame.module.css";
import ReviewInput from "./ReviewInput.jsx"

const Frame = () => {
  return (
    <div className={styles.frame} data-model-id="1:2">
      <div className={styles.div}>

        {/* <div className={styles.rectangle} /> */}

        <div className={styles["div-2"]}>
          <div className={styles["div-3"]}>
            <div className={styles["text-wrapper-2"]}>제목을 입력해주세용</div>

            <div className={styles["div-4"]}>
              <div className={styles.view}>
                <div className={styles["text-wrapper-3"]}>작성자 |</div>
                <div className={styles["div-wrapper"]}>
                  <div className={styles["text-wrapper-4"]}>김아무개</div>
                </div>
              </div>

              <div className={styles.view}>
                <div className={styles["text-wrapper-3"]}>조회수 |</div>
                <div className={styles["div-wrapper"]}>
                  <div className={styles["text-wrapper-4"]}>10</div>
                </div>
              </div>

              <div className={styles.view}>
                <div className={styles["text-wrapper-3"]}>작성일 |</div>
                <div className={styles["div-wrapper"]}>
                  <div className={styles["text-wrapper-4"]}>0000-00-00 00:00:00</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles["view-2"]}>
            <img
              className={styles.line}
              alt="Line"
              src="https://c.animaapp.com/xmCIijUi/img/line-2.svg"
            />

            <div className={styles["view-3"]}>
              <p className={styles.p}>
                아 진짜 강아지 너무 귀여워...
                <br />
                우리집 강아지 소개해줘도 됌?
                <br />
                <br />
                우리 강아지 검은개랑 하얀개 있는데 정말 귀여움
                <br />
                <br />
                검은개는 화정이고, 하얀개는 누리거든?
                <br />
                <br />
                화정이는 푸들인데 뒷다리 약함 ㄷㄷ;
                <br />
                <br />
                누리는 포메인데 ㅈㄴ 큼 ㅋㅋㅋㅋㅋㅋㅋ <br />
                <br />
                둘다 짭인게 확실함 ㅋㅋ
              </p>
            </div>

            <img
              className={styles.img}
              alt="Line"
              src="https://c.animaapp.com/xmCIijUi/img/line-2.svg"
            />
          </div>

          <div className={styles["div-5"]}>
            <div className={styles["view-4"]}>
              <div className={styles["text-wrapper-5"]}>댓글</div>
              <div className={styles["div-wrapper-2"]}>
                <div className={styles["text-wrapper-3"]}>[00]</div>
              </div>
            </div>

            <div className={styles["view-5"]}>
              <div className={styles["view-6"]}>
                <div className={styles["div-6"]}>
                  <div className={styles["text-wrapper-6"]}>강아지 사랑</div>
                  <div className={styles["text-wrapper-7"]}>대댓글</div>

                  <img
                    className={styles["line-2"]}
                    alt="Line"
                    src="https://c.animaapp.com/xmCIijUi/img/line-3-1.svg"
                  />

                  <div className={styles["text-wrapper-8"]}>수정</div>

                  <img
                    className={styles["line-2"]}
                    alt="Line"
                    src="https://c.animaapp.com/xmCIijUi/img/line-3-1.svg"
                  />

                  <div className={styles["text-wrapper-8"]}>삭제</div>
                </div>

                <div className={styles["div-wrapper-3"]}>
                  <p className={styles["text-wrapper-9"]}>
                    에이 그럴리가요 !?
                    <br />
                    말도 안되는 소리 하지마세요 ㅋㅋ
                  </p>
                </div>
              </div>

              <div className={styles["frame-wrapper"]}>
                <div className={styles["div-7"]}>
                  <div className={styles["div-8"]}>
                    <img
                      className={styles.vector}
                      alt="Vector"
                      src="https://c.animaapp.com/xmCIijUi/img/vector-1.svg"
                    />

                    <div className={styles["div-9"]}>
                      <div className={styles["text-wrapper-10"]}>강아지 팩폭러</div>
                      <div className={styles["text-wrapper-7"]}>대댓글</div>

                      <img
                        className={styles["line-2"]}
                        alt="Line"
                        src="https://c.animaapp.com/xmCIijUi/img/line-3-1.svg"
                      />

                      <div className={styles["text-wrapper-8"]}>수정</div>

                      <img
                        className={styles["line-2"]}
                        alt="Line"
                        src="https://c.animaapp.com/xmCIijUi/img/line-3-1.svg"
                      />

                      <div className={styles["text-wrapper-8"]}>삭제</div>
                    </div>
                  </div>

                  <div className={styles["div-wrapper-4"]}>
                    <p className={styles["text-wrapper-9"]}>
                      그런 개들 있음 ㅋㅋ <br />
                      강아지가 그렇게 좋으세용?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ReviewInput />

          <div className={styles["div-10"]}>
            <div className={styles["div-wrapper-5"]}>
              <div className={styles["text-wrapper-3"]}>목록으로</div>
            </div>

            <div className={styles["div-wrapper-6"]}>
              <div className={styles["text-wrapper-3"]}>글쓰기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frame;
