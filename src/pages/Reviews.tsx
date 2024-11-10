import Row from "../components/Row";
import ReviewsTable from "~/features/reviews/ReviewsTable";
import ReviewsOperations from "~/features/reviews/ReviewsOperations";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Reviews() {
  return (
    <>
      <Row $type="horizontal">
        <h2>Reviews</h2>
        <ReviewsOperations />
      </Row>
      <Row>
        <ReviewsTable />
      </Row>
    </>
  );
}

export default Reviews;
