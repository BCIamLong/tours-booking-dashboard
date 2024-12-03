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
import { Guest } from "~/types";
import Tag from "~/components/Tag";
import UpdateGuestForm from "./UpdateGuestForm";
import useDeleteGuest from "./useDeleteGuest";
import GuestDetailForm from "./GuestDetailForm";
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

interface GuestsItemProps {
  guest: Guest;
}

const colors = {
  "true": "green",
  "false": "red",
};


function GuestsItem({ guest }: GuestsItemProps) {
  // const { handlers } = useToaster();
  // const { startPause, endPause } = handlers;
  // const [isConfirm, setIsConfirm] = useState(false);
  const { isDeleting, deleteGuestMutate } = useDeleteGuest();
  // const { isDeleting, deleteCabinMutate } = useDeleteCabin();
  // const { isCreating, createTourMutate } = useCreateTour();
  // const { isCreating, createCabinMutate } = useCreateCabin();

  const { fullName, email, _id: guestId, verifyEmail, enable2FA, avatar, createdAt } = guest;
  // const avatarUrl = avatar ? avatar : '/default-user.jpg'
  const avatarUrl = !avatar?.includes('https') ? `/${avatar}` : avatar
  const guestITF = new Date(createdAt).getTime() * Math.random()
  // function handleDuplicateCabin() {
  // const newCabinData = {
  //   name: `Copy of ${name}`,
  //   maxCapacity,
  //   regularPrice,
  //   discount,
  //   description,
  //   image,
  // };
  // createCabinMutate(newCabinData, {
  //   onSuccess: () => {
  //     toast.success("Duplicate cabin successful");
  //   },
  // });
  // const formData = new FormData()
  // // console.log(Object.entries(tour))
  // Object.entries(tour).forEach(entry => {
  //   if (entry[0] === 'ratingsAverage' || entry[0] === 'ratingsQuantity' || entry[0] === 'id' || entry[0] === '_id' || entry[0] === 'vip' || entry[0] === 'createdAt' || entry[0] === 'updatedAt') return
  //   if (entry[0] === 'name') return formData.append(entry[0], 'Copy of ' + entry[1])
  //   if (entry[0] === 'startLocation') return formData.append(entry[0], JSON.stringify(entry[1]))
  //   if (entry[0] === 'startDates') return entry[1].forEach((date: StartDate) => formData.append(entry[0], JSON.stringify(date)))
  //   if (entry[0] === 'locations') return entry[1].forEach((loc: Location) => formData.append(entry[0], JSON.stringify(loc)))
  //   if (entry[0] === 'images') return entry[1].forEach((img: string) => formData.append(entry[0], img))

  //   formData.append(entry[0], entry[1])
  // })
  // createTourMutate(formData, {
  //   onSuccess: () => {
  //     toast.success("Duplicate tour successful");
  //   },
  // });
  // }
  return (
    <>
      <Table.Row>
        <div>
          <Image src={avatarUrl} alt={`${fullName} guest`} />
        </div>
        <div>
          <Name>{fullName}</Name>
        </div>
        <div>
          <p>{email}</p>
        </div>
        <div>
          <p><Tag $color={colors[`${verifyEmail!}`]}>{verifyEmail ? 'Verified' : 'Unverified'}</Tag></p>
        </div>
        <div>
          <p><Tag $color={colors[`${enable2FA!}`]}>{enable2FA ? 'Enabled' : 'Disabled'}</Tag></p>
          {/* {cabin.discount ? (
            <Discount $isExist={true}>{formatCurrency(cabin.discount)}</Discount>
          ) : (
            <Discount $isExist={false}>&mdash;</Discount>
          )} */}
        </div>
        <Menus.Menu>
          <Menus.Toggle id={guestITF}>
            <Button $size="tiny" $variation="option">
              <StyledHiEllipsisVertical />
            </Button>
          </Menus.Toggle>

          <Modal>
            <Menus.Box id={guestITF}>
              {/* <Menus.Button disabled={isCreating} onClick={handleDuplicateCabin}>
                <HiMiniSquare2Stack />
                <span>{isCreating ? "Duplicating" : "Duplicate"}</span>
              </Menus.Button> */}
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

              </Modal.Open>
            </Menus.Box>

            <Modal.Window name="edit-form">
              <UpdateGuestForm guestToEdit={guest} />
            </Modal.Window>
            <Modal.Window name="detail-form">
              <GuestDetailForm guest={guest} />
            </Modal.Window>

            <Modal.Window name="confirm-box">
              <ConfirmDelete
                recourseName="cabin"
                onConfirm={() => {
                  deleteGuestMutate(guestId);
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

export default GuestsItem;
