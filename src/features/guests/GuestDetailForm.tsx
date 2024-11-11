import styled from "styled-components";
import { SubmitHandler, useForm, FieldErrors, FieldValues } from "react-hook-form";

import useCreateGuest from "./useCreateGuest";
// import useEditCabin from "./useEditCabin";
import Button from "~/components/Button";
import { FileInput, Form, FormRow, Input } from "~/components/form";
import toast from "react-hot-toast";
// import Textarea from "~/components/form/Textarea";
import { Guest, GuestInput, GuestUpdateInput } from "~/types";
import useUpdateGuest from "./useUpdateGuest";
import { formatTime } from "~/utils/dateUtils";
// import useUpdateGuest from "./useUpdateGuest";
// import { useModalContext } from "~/components/Modal";
// import Cabin from "../../types/cabin.type";

const Buttons = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-left: auto;
  margin-right: 0;
  padding-top: 2rem;
`;

// const Textarea = styled.textarea`
//   padding: 1.6rem 1.2rem;
//   border-radius: var(--border-radius-sm);
//   /* border-color: inherit; */
//   border: 1.5px solid var(--color-grey-200);
//   width: 55%;
//   resize: none;

//   &:focus {
//     /* border: none; */
//   }
// `;

// interface Inputs extends FieldValues {
//   name: string;
//   maxCapacity: number;
//   regularPrice: number;
//   discount: number;
//   description: string;
//   image: FileList;
// }

const Image = styled.img`
width: 10rem;
border-radius: 10px;
`


interface GuestFormProps {
  // * because now we can pass in this setShowForm via cloneElement in Modal.Window component so therefore this prop can be optional because we have case we don't need to pass in setShowForm prop tp GuestForm when we use it with Modal component right

  onCloseModal?: (show: boolean) => void;
  guest: Guest;
}

// function GuestForm({ guest }: GuestFormProps) {
function GuestDetailForm({ guest }: GuestFormProps) {
  // const { open: setShowForm } = useModalContext()!;


  const { _id: guestId, fullName, avatar, email, role, verifyEmail, enable2FA, createdAt, updatedAt } = guest || {}

  const isWorking = true;

  return (
    <Form >
      <FormRow label="Full Name" errorMsg={""}>
        <Input
          type="text"
          id="fullName"
          value={fullName}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="email" errorMsg={""}>
        <Input
          type="email"
          id="email"
          value={email}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="role" errorMsg={""}>
        <Input
          type="text"
          id="role"
          value={role}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="avatar" errorMsg={""} widthOfItem="29rem">
        <Image src={avatar} id="avatar" alt="" />
      </FormRow>
      <FormRow label="Verify Email" errorMsg={""}>
        <Input
          type="text"
          id="verifyEmail"
          value={verifyEmail ? 'Yes' : 'No'}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Enable 2FA" errorMsg={""}>
        <Input
          type="text"
          id="enable2FA"
          value={enable2FA ? 'Yes' : 'No'}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Created At" errorMsg={""}>
        <Input
          type="text"
          id="createdAt"
          value={formatTime(createdAt)}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Updated At" errorMsg={""}>
        <Input
          type="text"
          id="updatedAt"
          value={formatTime(updatedAt)}
          disabled={isWorking}
        />
      </FormRow>
    </Form>
  );
}

export default GuestDetailForm;
