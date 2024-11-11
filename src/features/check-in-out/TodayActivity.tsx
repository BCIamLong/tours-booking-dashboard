import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "~/components/Button";
import Flag from "~/components/Flag";
import Tag from "~/components/Tag";
import { Booking } from "~/types/booking.type";
import { CheckOutButton } from "../booking/CheckOutButton";
// import { CheckOutButton } from "./CheckOutButton";
import { Guest } from "~/types";

const StyledTodayActivity = styled.div`
  display: grid;
  grid-template-columns: 8.7rem 3rem 8rem 6rem 8rem;
  /* grid-template-columns: 1.35fr 0.4fr 1.5fr 1fr 1.6fr; */
  justify-content: start;
  align-items: start;

  column-gap: 0.8rem;
  align-items: center;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid var(--color-grey-100);
  width: 100%;
  &:first-child {
    border-top: 1px solid var(--color-grey-100);
    padding-top: 1.2rem;
  }
`;

const GuestName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;

const Nights = styled.p`
  font-size: 1rem;
  text-transform: uppercase;
`;

export default function TodayActivity({ activity }: { activity: Booking }) {
  const {
    status,
    guestId,
    numNights,
    _id: id,
  } = activity;

  const { countryFlag, fullName, avatar } = guestId as Guest || {}
  const avatarStr = avatar ? avatar : 'default-avatar.jpg'
  // console.log(countryFlag)
  return (
    <StyledTodayActivity>
      {/* {status === "unconfirmed" ? <Tag $color="green">Arriving</Tag> : <Tag $color="blue">Departing</Tag>} */}
      {status === "confirmed" ? <Tag $color="green">Arriving</Tag> : <Tag $color="blue">Departing</Tag>}
      {(countryFlag?.length && countryFlag !== 'none') ? <Flag src={countryFlag} /> : <Flag src={avatarStr} />}
      <GuestName>{fullName}</GuestName>
      <Nights>{numNights} nights</Nights>
      {status === "confirmed" ? (
        <Button $size="mini" as={Link} to={`/check-in/${id}`}>
          Check in
        </Button>
      ) : (
        <CheckOutButton bookingId={id} />
      )}
    </StyledTodayActivity>
  );
}
