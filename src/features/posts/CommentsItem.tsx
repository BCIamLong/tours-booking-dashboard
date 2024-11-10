// import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { HiEllipsisVertical, HiPencil, HiMiniTrash } from "react-icons/hi2";

// import useDeleteCabin from "../cabins/useDeleteCabin";
// import Cabin from "~/types/cabin.type";
// import formatCurrency from "~/utils/formatCurrency";
import Button from "~/components/Button";
// import CabinForm from "./TourForm";
// import useCreateCabin from "../cabins/useCreateCabin";
// import toast from "react-hot-toast";
import Modal from "~/components/Modal";
import { ConfirmDelete } from "~/components/ConfirmDelete";
import Table from "~/components/Table";
import Menus from "~/components/Menus";
import { Guest, Comment, Tour } from "~/types";
// import CommentForm from "./CommentForm";
import { useNavigate, useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import useUpdatePost from "./useUpdatePost";
// import useDeleteTour from "./useDeleteTour";
// import TourForm from "./TourForm";
// import useCreateTour from "./useCreateTour";

const Image = styled.img`
  width: 50%;
`;

const Name = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-grey-500);
  letter-spacing: 1px;
`;

const Title = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  letter-spacing: 1px;
`;

const Description = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  letter-spacing: 1px;
`;

// const RegularPrice = styled.p`
//   font-size: 1.2rem;
//   font-weight: 700;
//   letter-spacing: 0.8px;
// `;

interface Discount {
  $isExist?: boolean;
}

const Discount = styled.p<Discount>`
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.8px;
  color: var(--color-green-700);

  ${(props) =>
    !props.$isExist &&
    css`
      font-size: 1.4rem;
      color: inherit;
    `}
`;

const StyledHiEllipsisVertical = styled(HiEllipsisVertical)`
  font-size: 2.4rem;
  font-weight: 700;

  &:active.div {
    display: block;
  }
`;

// const Options = styled.button``;

interface CommentsItemProps {
  comment: Comment;
  comments: Comment[]
}

const colors = {
  "true": "green",
  "false": "red",
};


function CommentsItem({ comment, comments }: CommentsItemProps) {
  // const navigate = useNavigate()
  // const { handlers } = useToaster();
  // const { startPause, endPause } = handlers;
  // const [isConfirm, setIsConfirm] = useState(false);
  // const { isDeleting, deleteCommentMutate } = useDeleteComment();
  // const { isDeleting, deleteCabinMutate } = useDeleteCabin();
  // const { isCreating, createTourMutate } = useCreateTour();
  // const { isCreating, createCabinMutate } = useCreateCabin();

  const { _id: commentId, userId, content, likes } = comment || {};
  const { fullName, avatar } = userId as Guest || {}
  const avatarStr = avatar ? avatar : 'default-avatar.jpg'
  const { id } = useParams()
  const { isUpdating, updatePostMutate } = useUpdatePost()

  const handleDeleteComment = function () {
    const newComments = comments.filter(com => com._id !== commentId)

    updatePostMutate({ id: id!, newPostData: { comments: newComments } })
  }

  return (
    <>
      <Table.Row>
        <div>
          <Image src={avatarStr} />
        </div>
        <div>
          <Name>{fullName}</Name>
        </div>
        <div>
          <Title>{content}</Title>
        </div>
        <div>
          <Description>{likes.length}</Description>
        </div>
        <Menus.Menu>
          <Menus.Toggle id={Date.now()}>
            <Button $size="tiny" $variation="option">
              <StyledHiEllipsisVertical />
            </Button>
          </Menus.Toggle>

          <Modal>
            <Menus.Box id={Date.now()}>
              {/* <Menus.Button disabled={isCreating} onClick={handleDuplicateCabin}>
                <HiMiniSquare2Stack />
                <span>{isCreating ? "Duplicating" : "Duplicate"}</span>
              </Menus.Button> */}

              <Modal.Open opens="edit-form">
                <Menus.Button>
                  <HiPencil />
                  <span>Edit</span>
                </Menus.Button>
                {/* <button>
                  <HiPencil />
                  <span>Edit</span>
                </button> */}
              </Modal.Open>

              <Modal.Open opens="confirm-box">
                <Menus.Button disabled={isUpdating}>
                  <HiMiniTrash />
                  <span>Delete</span>
                </Menus.Button>

              </Modal.Open>
            </Menus.Box>

            <Modal.Window name="edit-form">
              <CommentForm commentToEdit={comment} comments={comments} />
            </Modal.Window>

            <Modal.Window name="confirm-box">
              <ConfirmDelete
                recourseName="cabin"
                onConfirm={() => {
                  handleDeleteComment();
                }}
                disabled={isUpdating}
              />
            </Modal.Window>
          </Modal>
        </Menus.Menu>
        {/* {showForm && (
            <Popup onShow={() => setShowForm((show) => !show)}>
            <CabinForm setShowForm={setShowForm} cabinToEdit={cabin} />
            </Popup>
          )} */}
      </Table.Row>
      {/* {showForm && (
        <Popup onShow={() => setShowForm((show) => !show)}>
          <CabinForm setShowForm={setShowForm} cabinToEdit={cabin} />
        </Popup>
      )} */}
    </>
  );
}

export default CommentsItem;
