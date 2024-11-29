// import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { HiEllipsisVertical, HiPencil, HiMiniTrash, HiMiniEye } from "react-icons/hi2";

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
import { Guest, Post, Tour } from "~/types";
import Tag from "~/components/Tag";
import useDeletePost from "./useDeletePost";
import PostForm from "./PostForm";
import { useNavigate } from "react-router-dom";
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
  font-size: 1.2rem;
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

interface PostsItemProps {
  post: Post;
}

const colors = {
  "true": "green",
  "false": "red",
};


function PostsItem({ post }: PostsItemProps) {
  const navigate = useNavigate()
  // const { handlers } = useToaster();
  // const { startPause, endPause } = handlers;
  // const [isConfirm, setIsConfirm] = useState(false);
  const { isDeleting, deletePostMutate } = useDeletePost();
  // const { isDeleting, deleteCabinMutate } = useDeleteCabin();
  // const { isCreating, createTourMutate } = useCreateTour();
  // const { isCreating, createCabinMutate } = useCreateCabin();

  const { _id: postId, title, description, tourId, userId, images } = post || {};
  const { name } = tourId as Tour || {}
  const { fullName } = userId as Guest || {}

  return (
    <>
      <Table.Row>
        <div>
          <Image src={images[0]} alt={`${fullName} post`} />
        </div>
        <div>
          <Name>{name}</Name>
        </div>
        <div>
          <Name>{fullName}</Name>
        </div>
        <div>
          <Title>{title}</Title>
        </div>
        <div>
          <Description>{description.slice(0, 90)}...</Description>
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
              <Menus.Button onClick={() => navigate(`/posts/${postId}`)}>
                <HiMiniEye />
                <span>See detail</span>
              </Menus.Button>

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
                <Menus.Button disabled={isDeleting}>
                  <HiMiniTrash />
                  <span>Delete</span>
                </Menus.Button>

              </Modal.Open>
            </Menus.Box>

            <Modal.Window name="edit-form">
              <PostForm postToEdit={post} />
            </Modal.Window>

            <Modal.Window name="confirm-box">
              <ConfirmDelete
                recourseName="cabin"
                onConfirm={() => {
                  deletePostMutate(postId);
                }}
                disabled={isDeleting}
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

export default PostsItem;
