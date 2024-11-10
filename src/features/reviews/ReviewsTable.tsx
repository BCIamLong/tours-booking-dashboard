import Table from "~/components/Table";
import { useReviews } from "./useReviews";
import Spinner from "~/components/Spinner";
import ReviewItem from "./ReviewRow";
import Menu from "~/components/Menus";
import { useSearchParams } from "react-router-dom";
import { FilterReviewsOptions, Review, SortOptions } from "~/types";
import Empty from "~/components/Empty";
import Pagination from "~/components/Pagination";

function ReviewsTable() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "none";
  const sort = searchParams.get("sort") || "none";

  const { reviews, error, isLoading, count } = useReviews({ sort: sort as SortOptions, filter: filter as FilterReviewsOptions });



  if (isLoading) return <Spinner />;

  if (error) return;
  if (!reviews?.length) return <Empty resourceName="reviews" />;

  return (
    <Menu>
      <Table columns="0.2fr 2fr 1.5fr 2.4fr 0.8fr 0.3fr">
        <Table.Header>
          <div></div>
          <div>Tour</div>
          <div>Guest</div>
          <div>Review</div>
          <div>Rating</div>
          <div></div>
        </Table.Header>

        <Table.Body<Review>
          data={reviews as Review[]}
          render={(review) => <ReviewItem review={review} key={review._id} />}
        />
        {/* <Table.Body data={reviewsFiltered} render={(review) => <ReviewItem review={review} key={review.id} />} /> */}
        {/* <Table.Body data={reviews} render={(review) => <ReviewItem review={review} key={review.id} />} /> */}

        {/* {reviews?.map()} */}
        <Table.Footer>
          <Pagination count={count || 0} />
        </Table.Footer>
      </Table>
    </Menu>
  );
}

export default ReviewsTable;
