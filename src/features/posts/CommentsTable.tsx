import Table from "~/components/Table";
import Menu from "~/components/Menus";
import Empty from "~/components/Empty";
import CommentsItem from "./CommentsItem";
import Pagination from "~/components/Pagination";
import { Comment } from "~/types";

function CommentsTable({ comments }: { comments: Comment[] }) {

  const count = comments?.length || 0
  if (!count) return <Empty resourceName="comments" />;

  return (
    <Menu>
      <Table columns="1fr 1.5fr 2fr 1fr 0.3fr">
        <Table.Header>
          <div></div>
          <div>Guest</div>
          <div>Comment</div>
          <div>Likes</div>
          <div></div>
        </Table.Header>

        <Table.Body<Comment>
          data={comments as Comment[]}
          render={(comment) => <CommentsItem comment={comment} comments={comments} key={comment._id} />}
        />
        {/* <Table.Body data={cabinsFiltered} render={(cabin) => <CabinItem cabin={cabin} key={cabin.id} />} /> */}
        {/* <Table.Body data={cabins} render={(cabin) => <CabinItem cabin={cabin} key={cabin.id} />} /> */}

        {/* {cabins?.map()} */}
        <Table.Footer>
          <Pagination count={count || 0} />
        </Table.Footer>
      </Table>
    </Menu>
  );
}

export default CommentsTable;
