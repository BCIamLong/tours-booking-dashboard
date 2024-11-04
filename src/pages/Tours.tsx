import ToursTable from "~/features/tours/ToursTable";
import Row from "../components/Row";
import ToursOperations from "~/features/tours/ToursOperations";
import { AddTour } from "~/features/tours/AddTour";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Tours() {
  return (
    <>
      <Row $type="horizontal">
        <h2>Tours</h2>
        {/* <p>Filter / Sort</p> */}
        <ToursOperations />
      </Row>
      <Row>
        <ToursTable />
        <AddTour />
      </Row>
    </>
  );
}

export default Tours;
