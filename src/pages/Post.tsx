import PostDetail from "~/features/posts/PostDetail";
import Row from "../components/Row";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Post() {
  return (
    <>
      <Row $type="horizontal">
        <h2>Post Detail</h2>
      </Row>
      <PostDetail />
    </>
  );
}

export default Post;
