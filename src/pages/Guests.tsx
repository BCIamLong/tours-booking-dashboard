import Row from "../components/Row";
import GuestsTable from "~/features/guests/Gueststable";
import { AddGuest } from "~/features/guests/AddGuest";
import GuestsOperations from "~/features/guests/GuestsOperations";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Guests() {
  return (
    <>
      <Row $type="horizontal">
        <h2>Guests</h2>
        {/* <p>Filter / Sort</p> */}
        <GuestsOperations />
      </Row>
      <Row>
        <GuestsTable />
        <AddGuest />
      </Row>
    </>
  );
}

export default Guests;
