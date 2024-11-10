import styled from "styled-components";
import { SubmitHandler, useForm, FieldErrors, FieldValues } from "react-hook-form";

// import useEditCabin from "./useEditCabin";
import Button from "~/components/Button";
import { FileInput, Form, FormRow, Input } from "~/components/form";
import toast from "react-hot-toast";
// import Textarea from "~/components/form/Textarea";
import { Comment, CommentInput, Post, PostInput } from "~/types";
import useUpdatePost from "./useUpdatePost";
import Textarea from "~/components/form/Textarea";
import { useParams } from "react-router-dom";
// import useUpdatePost from "./useUpdatePost";
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

interface CommentFormProps {
  // * because now we can pass in this setShowForm via cloneElement in Modal.Window component so therefore this prop can be optional because we have case we don't need to pass in setShowForm prop tp PostForm when we use it with Modal component right

  onCloseModal?: (show: boolean) => void;
  commentToEdit?: Comment;
  comments: Comment[]
}

// function PostForm({ postToEdit }: CommentFormProps) {
function CommentForm({ onCloseModal: setShowForm, commentToEdit, comments }: CommentFormProps) {
  // const { open: setShowForm } = useModalContext()!;
  const { id } = useParams();

  const { _id: editId, content } = commentToEdit || {};

  const { register, handleSubmit, formState, getValues, reset } = useForm<CommentInput>({
    defaultValues: editId ? ({ content } as FieldValues) : {},
  });

  const { errors } = formState;

  const { isUpdating, updatePostMutate } = useUpdatePost();

  const isWorking = isUpdating;

  const onSubmit: SubmitHandler<CommentInput> = function (data) {
    // console.log(data);
    // mutate({ ...data, image: data.image[0] });
    // if (editId) return console.log(data);
    const { content } = data;
    const newComments = comments.map(com => com._id === editId ? { ...com, content: content } : com)

    updatePostMutate(
      { id: id!, newPostData: { comments: newComments } },
      {
        onSuccess: (data: Post) => {
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
      <FormRow label="Content" errorMsg={errors.content?.message || ""}>
        <Textarea id="content" {...register("content", { required: "This field is required" })} disabled={isWorking} />
      </FormRow>
      <Buttons>
        <Button $size="medium" $variation="secondary" type="reset" onClick={() => setShowForm?.(false)}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isWorking ? "Processing" : editId ? "Edit post" : "Create new post"}</Button>
      </Buttons>
    </Form>
  );
}

export default CommentForm;
