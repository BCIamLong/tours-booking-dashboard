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

interface GuestFormProps {
  // * because now we can pass in this setShowForm via cloneElement in Modal.Window component so therefore this prop can be optional because we have case we don't need to pass in setShowForm prop tp GuestForm when we use it with Modal component right

  onCloseModal?: (show: boolean) => void;
  guestToEdit: Guest;
}

// function GuestForm({ guestToEdit }: GuestFormProps) {
function UpdateGuestForm({ onCloseModal: setShowForm, guestToEdit }: GuestFormProps) {
  // const { open: setShowForm } = useModalContext()!;
  const { _id: editId, ...editData } = guestToEdit || {};
  const { register, handleSubmit, formState, getValues, reset } = useForm<GuestUpdateInput>({
    defaultValues: editId ? (editData as FieldValues) : {},
  });

  const { errors } = formState;

  const { isUpdating, updateGuestMutate } = useUpdateGuest()

  const isWorking = isUpdating;

  const onSubmit: SubmitHandler<GuestUpdateInput> = function (data) {
    // console.log(data);
    // mutate({ ...data, image: data.image[0] });
    // if (editId) return console.log(data);
    const { fullName, email, avatar, role } = data
    const formData = new FormData()

    if (fullName) formData.append('fullName', fullName)
    if (email) formData.append('email', email)
    if (role) formData.append('role', role)
    if (typeof avatar === 'string') formData.append('avatar', avatar)
    else formData.append('avatar', avatar![0])

    updateGuestMutate({ id: editId, newGuestData: formData }, {
      onSuccess: (data) => {
        // * notice that in the onSuccess we can access to the newly data so it can be the new edited data in this case
        console.log(data);
        setTimeout(() => {
          setShowForm?.(false);
        }, 1000);
      }
    });
  };

  const onError = function (errors: FieldErrors) {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full Name" errorMsg={errors.fullName?.message || ""}>
        {/* <Input type="text" id="name" {...register("name", { required: true })} /> 
        instead use it with required true we can custom it with the message text to show the message on UI for users right*/}
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="email" errorMsg={errors.email?.message || ""}>
        <Input
          type="email"
          id="email"
          {...register("email", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="role" errorMsg={errors.role?.message || ""}>
        <Input
          type="text"
          id="role"
          {...register("role", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="avatar" errorMsg={errors.avatar?.message || ""}>
        <FileInput
          id="avatar"
          {...register("avatar", { required: editId ? false : "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>


      <Buttons>
        <Button $size="medium" $variation="secondary" type="reset" onClick={() => setShowForm?.(false)}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isWorking ? "Processing" : editId ? "Edit guest" : "Create new guest"}</Button>
      </Buttons>
    </Form>
  );
}

export default UpdateGuestForm;
