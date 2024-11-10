import Table from "~/components/Table";
import Spinner from "~/components/Spinner";
import Menu from "~/components/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "~/components/Empty";
import { FilterPostsOptions, Post, SortOptions } from "~/types";
import { usePosts } from "./usePosts";
import PostsItem from "./PostsItem";
import Pagination from "~/components/Pagination";

function PostsTable() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "none";
  const filter = searchParams.get("filter") || "none";

  const { posts, error, isLoading, count } = usePosts({ sort: sort as SortOptions, filter: filter as FilterPostsOptions });
  // console.log(posts, count)

  if (isLoading) return <Spinner />;

  if (error) return;
  if (!posts?.length) return <Empty resourceName="posts" />;

  return (
    <Menu>
      <Table columns="1fr 1.6fr 1.5fr 2fr 2.1fr 0.3fr">
        <Table.Header>
          <div></div>
          <div>Tour</div>
          <div>Guest</div>
          <div>Title</div>
          <div>Description</div>
          <div></div>
        </Table.Header>

        <Table.Body<Post>
          data={posts as Post[]}
          render={(post) => <PostsItem post={post} key={post._id} />}
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

export default PostsTable;
