// import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { HiEllipsisVertical, HiPencil, HiMiniTrash, HiMiniSquare2Stack, HiMiniEye } from "react-icons/hi2";

import useDeleteReview from "./useDeleteReview";
import { Guest, Review, Tour } from "~/types";
import formatCurrency from "~/utils/formatCurrency";
import Button from "~/components/Button";
// import ReviewForm from "./ReviewForm";
// import useCreateReview from "./useCreateReview";
import toast from "react-hot-toast";
import Modal from "~/components/Modal";
import { ConfirmDelete } from "~/components/ConfirmDelete";
import Table from "~/components/Table";
import Menus from "~/components/Menus";
import Tag from "~/components/Tag";
import ReviewForm from "./ReviewsForm";
import ReviewDetailForm from "./ReviewDetailForm";

const Image = styled.img`
  width: 70%;
`;

const Name = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-grey-500);
  letter-spacing: 1px;
`;

const RegularPrice = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.8px;
`;

const Content = styled.p`
  font-size: 1.4rem;
  /* font-weight: 600; */
  color: var(--color-silver-700);
`;

const Rating = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
`;

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

interface ReviewItemProps {
  review: Review;
}

const colors = {
  '1': 'red',
  '2': 'brown',
  '3': 'black',
  '4': 'yellow',
  '5': 'green',
}

function ReviewItem({ review }: ReviewItemProps) {
  // const { handlers } = useToaster();
  // const { startPause, endPause } = handlers;
  // const [isConfirm, setIsConfirm] = useState(false);
  const { isDeleting, deleteReviewMutate } = useDeleteReview();

  const { cabin, rating, review: reviewContent, user, _id: reviewId, createdAt } = review || {};
  const { name } = cabin as Tour || {}
  const { fullName } = user as Guest || {}

  return (
    <>
      <Table.Row>
        <div></div>
        <div>
          <Name>{name}</Name>
        </div>
        <div>
          <Name>{fullName}</Name>
        </div>
        <div>
          <Content>{reviewContent}</Content>
        </div>
        <div>
          <p><Tag $color={colors[String(rating)]}>{rating}</Tag></p>
        </div>
        <Menus.Menu>
          <Menus.Toggle id={new Date(createdAt).getTime()}>
            <Button $size="tiny" $variation="option">
              <StyledHiEllipsisVertical />
            </Button>
          </Menus.Toggle>

          <Modal>
            <Menus.Box id={new Date(createdAt).getTime()}>
              <Modal.Open opens="detail-form">
                <Menus.Button>
                  <HiMiniEye />
                  <span>See detail</span>
                </Menus.Button>
              </Modal.Open>
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
                {/* <button disabled={isDeleting}>
                  <HiMiniTrash />
                  <span>Delete</span>
                </button> */}
              </Modal.Open>
            </Menus.Box>

            <Modal.Window name="edit-form">
              <ReviewForm reviewToEdit={review} />
            </Modal.Window>
            <Modal.Window name="detail-form">
              <ReviewDetailForm review={review} />
            </Modal.Window>

            <Modal.Window name="confirm-box">
              <ConfirmDelete
                recourseName="review"
                onConfirm={() => {
                  deleteReviewMutate(reviewId);
                }}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </Menus.Menu>
        {/* {showForm && (
            <Popup onShow={() => setShowForm((show) => !show)}>
            <ReviewForm setShowForm={setShowForm} reviewToEdit={review} />
            </Popup>
          )} */}
      </Table.Row>
      {/* {showForm && (
        <Popup onShow={() => setShowForm((show) => !show)}>
          <ReviewForm setShowForm={setShowForm} reviewToEdit={review} />
        </Popup>
      )} */}
    </>
  );
}

export default ReviewItem;
