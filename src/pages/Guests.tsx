import Row from "../components/Row";
import ToursOperations from "~/features/tours/ToursOperations";
import GuestsTable from "~/features/guests/Gueststable";
import { AddGuest } from "~/features/guests/AddGuest";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Guests() {
  return (
    <>
      <Row $type="horizontal">
        <h2>Guests</h2>
        {/* <p>Filter / Sort</p> */}
        <ToursOperations />
      </Row>
      <Row>
        <GuestsTable />
        <AddGuest />
      </Row>
    </>
  );
}

export default Guests;
