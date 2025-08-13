import PostReadComponents from "../components/postRead/PostReadComponents";
import Header from "../components/header/Header";

const PostRead = () => {
  return (
    <>
      <div className="container">
        <Header></Header>
        <PostReadComponents></PostReadComponents>
      </div>
    </>
  );
};

export default PostRead;
