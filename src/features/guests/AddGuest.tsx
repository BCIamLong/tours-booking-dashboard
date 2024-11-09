import Button from "~/components/Button";
import Modal from "~/components/Modal";
import GuestForm from "./GuestForm";

export function AddGuest() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button $size="medium">Add new guest</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <GuestForm />
      </Modal.Window>
    </Modal>
  );
}
