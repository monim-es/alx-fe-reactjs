import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { postId } = useParams();
  return (
    <div>
      <h2>Blog Post #{postId}</h2>
      <p>This is the content for post ID: {postId}</p>
    </div>
  );
};

export default BlogPost;
