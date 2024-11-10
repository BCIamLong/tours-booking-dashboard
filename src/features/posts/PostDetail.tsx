import styled from "styled-components";
import { SubmitHandler, useForm, FieldErrors, FieldValues } from "react-hook-form";

// import useEditCabin from "./useEditCabin";
import Button from "~/components/Button";
import { FileInput, Form, FormRow, Input } from "~/components/form";
import toast from "react-hot-toast";
// import Textarea from "~/components/form/Textarea";
import { Post, PostInput } from "~/types";
import useUpdatePost from "./useUpdatePost";
import Textarea from "~/components/form/Textarea";
import { usePost } from "./usePost";
import Spinner from "~/components/Spinner";
import Row from "~/components/Row";
import CommentsTable from "./CommentsTable";
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

const Image = styled.img`
width: 30rem;
border-radius: 10px;
`

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

interface PostFormProps {
  // * because now we can pass in this setShowForm via cloneElement in Modal.Window component so therefore this prop can be optional because we have case we don't need to pass in setShowForm prop tp PostForm when we use it with Modal component right

  onCloseModal?: (show: boolean) => void;
  postToEdit?: Post;
}

// function PostForm({ postToEdit }: PostFormProps) {
function PostDetail() {
  // const { open: setShowForm } = useModalContext()!;
  const { post, isLoading } = usePost()

  const { title, description, images, likes, shares, bookmarks, comments } = post as Post || {}

  const isWorking = true;

  if (isLoading) return <Spinner />

  return (<>
    <Row>
      <Form>
        <FormRow label="Title" errorMsg={""}>
          <Textarea
            id="title"
            value={title}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Description" errorMsg={""}>
          <Textarea
            id="description"
            value={description}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="image" errorMsg={""} widthOfItem="49rem">
          <Image src={images[0]} alt="" />
        </FormRow>
        <FormRow label="likes" errorMsg={""}>
          <Input
            type="number"
            id="likes"
            value={likes?.length} disabled={isWorking}
          />
        </FormRow>
        <FormRow label="shares" errorMsg={""}>
          <Input
            type="number"
            id="shares"
            value={shares} disabled={isWorking}
          />
        </FormRow>
        <FormRow label="bookmarks" errorMsg={""}>
          <Input
            type="number"
            id="bookmarks"
            value={bookmarks?.length} disabled={isWorking}
          />
        </FormRow>
      </Form >
    </Row>
    <Row>
      <h2>Post Comments</h2>
      <CommentsTable comments={comments} />
    </Row>
    <Row>
    </Row>
    <Row>
    </Row>
  </>
  );
}

export default PostDetail;
