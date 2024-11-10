import Row from "../components/Row";
import PostsTable from "~/features/posts/PostsTable";
import PostsOperations from "~/features/posts/PostsOperations";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Posts() {
  return (
    <>
      <Row $type="horizontal">
        <h2>Posts</h2>
        <PostsOperations />
      </Row>
      <Row>
        <PostsTable />
      </Row>
    </>
  );
}

export default Posts;
