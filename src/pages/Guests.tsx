import Row from "../components/Row";
import ToursOperations from "~/features/tours/ToursOperations";
import { AddTour } from "~/features/tours/AddTour";
import GuestsTable from "~/features/guests/Gueststable";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Guests() {
  return (
    <>
      <Row $type="horizontal">
        <h2>Tours</h2>
        {/* <p>Filter / Sort</p> */}
        <ToursOperations />
      </Row>
      <Row>
        <GuestsTable />
        <AddTour />
      </Row>
    </>
  );
}

export default Guests;
