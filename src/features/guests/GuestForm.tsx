import styled from "styled-components";
import { SubmitHandler, useForm, FieldErrors, FieldValues } from "react-hook-form";

import useCreateGuest from "./useCreateGuest";
// import useEditCabin from "./useEditCabin";
import Button from "~/components/Button";
import { Form, FormRow, Input } from "~/components/form";
import toast from "react-hot-toast";
// import Textarea from "~/components/form/Textarea";
import { Guest, GuestInput } from "~/types";
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
  guestToEdit?: Guest;
}

// function GuestForm({ guestToEdit }: GuestFormProps) {
function GuestForm({ onCloseModal: setShowForm, guestToEdit }: GuestFormProps) {
  // const { open: setShowForm } = useModalContext()!;
  const { _id: editId, ...editData } = guestToEdit || {};
  const { register, handleSubmit, formState, getValues, reset } = useForm<GuestInput>({
    defaultValues: editId ? (editData as FieldValues) : {},
  });

  const { errors } = formState;

  const { isCreating, createGuestMutate } = useCreateGuest();

  const isWorking = isCreating;

  const onSubmit: SubmitHandler<GuestInput> = function (data) {
    // console.log(data);
    // mutate({ ...data, image: data.image[0] });
    // if (editId) return console.log(data);
    createGuestMutate(data, {
      onSuccess: (data: Guest) => {
        // * notice that in the onSuccess we can access to the newly data so it can be the new created data in this case
        console.log(data);
        toast.success("Create new guest successful");
        reset();
        setTimeout(() => {
          setShowForm?.(false);
        }, 1000);
      },
    });
  };

  const onError = function (errors: FieldErrors) {
    console.log(errors);
  };

  /*
      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", { required: "This field is required" })} />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow> 
      * we can refactor this code here to the the FormRow component because in there we have things repeat many times right like Label and Error
  */

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

      <FormRow label="password" errorMsg={errors.password?.message || ""}>
        <Input
          id="password"
          type="password"
          disabled={isWorking}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow label="Confirm password" errorMsg={errors.passwordConfirm?.message || ""}>
        <Input
          id="passwordConfirm"
          type="password"
          disabled={isWorking}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (val) => val === getValues().password || "Please provide the correct confirm password",
          })}
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

export default GuestForm;
