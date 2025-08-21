import { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import Editor from "@toast-ui/editor";
import classes from "./PostToast.module.css"
import {replaceBase64Images} from './ImageUpload'
import { postWrite } from "../../api/postApi";
import { useNavigate } from "react-router-dom";

export default function PostToast() {
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const instance = new Editor({
      el: editorRef.current,
      height: "500px",
      initialEditType: "wysiwyg",
      // hideModeSwitch: true ,
      // useCommandShortcut: false,
      // initialEditType: "markdown",
      previewStyle: "vertical",
      initialValue: "",
      placeholder: "내용을 입력해 주세요..."
    });

    // 저장 핸들러에서 접근할 수 있게 저장
    editorRef.current.editorInstance = instance;

    return () => {
      instance.destroy();
    };
  }, []);

  const handleSave = async () => {
    const editorInstance = editorRef.current.editorInstance;
    const markdown = editorInstance.getHTML();
    // console.log("markdown : ",markdown)
    const contentHtml = await replaceBase64Images(markdown);
    const title = document.getElementById("title-input").value;
    console.log("contentHtml : ",contentHtml)

    const result = await postWrite(title, contentHtml)
    
    navigate(`/postRead?boardId=${result.boardId}`)
    // 여기에 API로 POST 요청 등 작성 가능
  };

  return (
    <div 
    className={classes.post_container}
    // className="container"
    >
      <div><h2>글쓰기</h2></div>
      <div className={classes.post_title}>
      <input
        id="title-input"
        type="text"
        placeholder="제목을 입력하세요"
        style = {{padding : "6px"}}
      />
      </div>
      <div ref={editorRef} id="editor" 
            className={classes.post_content}/>
      <button
        onClick={handleSave}
        className={classes.post_button}
      >
        저장
      </button>
    </div>
  );
}
