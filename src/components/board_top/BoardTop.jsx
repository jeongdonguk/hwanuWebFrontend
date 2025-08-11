import classes from './BoardTop.module.css'
import boardTopImg from './board_top_img.png'

function BoardTop() {
    return (
        <div className={classes.board_top_container}><img src={boardTopImg} />
        <div className={classes.board_top_title}>자유게시판</div>
        <div className={classes.board_top_text}>강아지에 대한 모든 이야기를 자유롭게 나누어보세요!<br />다른 강아지를 비하하거나, 꼬리를 무는 행위는 삼가세요.</div>
        </div>
    );
};

export default BoardTop;