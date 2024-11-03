import ToursTable from "~/features/tours/ToursTable";
import Row from "../components/Row";
import { AddCabin } from "~/features/cabins/AddCabin";
import ToursOperations from "~/features/tours/ToursOperations";
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
        <AddCabin />
      </Row>
    </>
  );
}

export default Tours;
