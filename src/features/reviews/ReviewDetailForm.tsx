import styled from "styled-components";
import { SubmitHandler, useForm, FieldErrors, FieldValues } from "react-hook-form";


import Button from "~/components/Button";
import { FileInput, Form, FormRow, Input } from "~/components/form";
import { Guest, Review, ReviewInput, Tour } from "~/types";
import toast from "react-hot-toast";
import Textarea from "~/components/form/Textarea";
import useUpdateReview from "./useUpdateReview";
import { formatTime } from "~/utils/dateUtils";
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
  review: Review;
}

// function ReviewForm({ review }: ReviewFormProps) {
function ReviewDetailForm({ review }: ReviewFormProps) {

  const { _id: reviewId, rating, review: reviewContent, cabin, user, createdAt, updatedAt } = review || {}
  const { name } = cabin as Tour || {}
  const { fullName } = user as Guest || {}

  const isWorking = true;



  return (
    <Form>
      <FormRow label="Tour" errorMsg={""}>
        <Input
          type="text"
          id="tour"
          value={name}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Guest" errorMsg={""}>
        <Input
          type="text"
          id="guest"
          value={fullName}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="review" errorMsg={""}>
        <Input
          type="text"
          id="review"
          value={reviewContent}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="rating" errorMsg={""}>
        <Input
          type="number"
          id="rating"
          max={5}
          min={1}
          value={rating}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Reviewed At" errorMsg={""}>
        <Input
          type="text"
          id="reviewedAt"
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

export default ReviewDetailForm;
