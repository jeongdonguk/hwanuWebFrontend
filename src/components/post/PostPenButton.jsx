import penImg from './penImg.png'
import classes from './PostPenButton.module.css'

function PostButton() {
    return(
        <a href='/post' className={classes.write_button}><img src={penImg}></img></a>
    );
}

export default PostButton