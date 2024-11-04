import Button from "~/components/Button";
import Modal from "~/components/Modal";
import TourForm from "./TourForm";

export function AddTour() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button $size="medium">Add new tour</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <TourForm />
      </Modal.Window>
    </Modal>
  );
}
