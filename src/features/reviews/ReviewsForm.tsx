import styled from "styled-components";
import { SubmitHandler, useForm, FieldErrors, FieldValues } from "react-hook-form";


import Button from "~/components/Button";
import { FileInput, Form, FormRow, Input } from "~/components/form";
import { Review, ReviewInput } from "~/types";
import toast from "react-hot-toast";
import Textarea from "~/components/form/Textarea";
import useUpdateReview from "./useUpdateReview";
// import { useModalContext } from "~/components/Modal";
// import Review from "../../types/review.type";

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


interface ReviewFormProps {
  // * because now we can pass in this setShowForm via cloneElement in Modal.Window component so therefore this prop can be optional because we have case we don't need to pass in setShowForm prop tp ReviewForm when we use it with Modal component right

  onCloseModal?: (show: boolean) => void;
  reviewToEdit: Review;
}

// function ReviewForm({ reviewToEdit }: ReviewFormProps) {
function ReviewForm({ onCloseModal: setShowForm, reviewToEdit }: ReviewFormProps) {
  // const { open: setShowForm } = useModalContext()!;
  const { _id: editId, ...editData } = reviewToEdit || {};
  const { review, rating } = editData || {}
  const { register, handleSubmit, formState, getValues, reset } = useForm<ReviewInput>({
    defaultValues: editId ? ({ review, rating } as FieldValues) : {},
  });

  const { errors } = formState;

  const { isUpdating, updateReviewMutate } = useUpdateReview();

  const isWorking = isUpdating;

  const onSubmit: SubmitHandler<ReviewInput> = function (data) {
    console.log(data);
    // mutate({ ...data, image: data.image[0] });
    // if (editId) return console.log(data);
    updateReviewMutate(
      { id: editId, newReviewData: data },
      {
        onSuccess: (data: Review) => {
          // * notice that in the onSuccess we can access to the newly data so it can be the new edited data in this case
          console.log(data);
          setTimeout(() => {
            setShowForm?.(false);
          }, 1000);
        },
      }
    );


  };

  const onError = function (errors: FieldErrors) {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="review" errorMsg={errors.review?.message || ""}>
        {/* <Input type="text" id="name" {...register("name", { required: true })} /> 
        instead use it with required true we can custom it with the message text to show the message on UI for users right*/}
        <Input
          type="text"
          id="review"
          {...register("review", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="rating" errorMsg={errors.rating?.message || ""}>
        <Input
          type="number"
          id="rating"
          max={5}
          min={1}
          {...register("rating", { required: "This field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <Buttons>
        <Button $size="medium" $variation="secondary" type="reset" onClick={() => setShowForm?.(false)}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isWorking ? "Processing" : editId ? "Edit review" : "Create new review"}</Button>
      </Buttons>
    </Form>
  );
}

export default ReviewForm;
