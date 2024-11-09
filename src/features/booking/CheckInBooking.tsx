import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useBooking } from "./useBooking";
import BookingDataBox from "./BookingDataBox";

import Spinner from "~/components/Spinner";
import Row from "~/components/Row";
import Button from "~/components/Button";
import Tag from "~/components/Tag";
import Checkbox from "~/components/Checkbox";
import formatCurrency from "~/utils/formatCurrency";
import { useState } from "react";

import useSettings from "../setting/useSettings";
// import useSettings from "../settings/useSettings";
import { useCheckIn } from "./useCheckIn";
import { Guest } from "~/types";

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 87%;
  gap: 2.4rem;
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 1.2rem;
  margin-top: 2rem;
  button {
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

const Title = styled.h2`
width: 70%;
text-align: left;
`

export default function CheckInBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [wantBreakfast, setWantBreakfast] = useState(false);
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { _id: id, status, guestId, totalPrice, hasBreakfast, numGuests, numNights } = booking || {};
  const { fullName } = guestId as Guest || {}
  const { checkIn, isCheckingIn } = useCheckIn();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const extrasPrice = settings?.[0]?.breakfastPrice * numGuests * numNights;

  function handleCheckIn() {
    if (wantBreakfast)
      return checkIn({
        bookingId: id,
        breakfastData: { hasBreakfast: true, extrasPrice, totalPrice: totalPrice + extrasPrice },
      });
    checkIn({ bookingId: id, breakfastData: {} });
  }

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row $type="horizontal">
        <Heading>
          <Title>Check in booking #{id}</Title>
          <Tag $color="blue">{status}</Tag>
        </Heading>
        <Button $variation="back" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </Row>
      <Row>
        <BookingDataBox booking={booking} />

        {!hasBreakfast && (
          <Checkbox
            onChange={() => {
              setWantBreakfast((has) => !has);
              setConfirmedPaid(false);
            }}
            checked={wantBreakfast}
            label={`Want to add breakfast for ${formatCurrency(extrasPrice)}?`}
            id={id}
          />
        )}

        <Checkbox
          onChange={() => setConfirmedPaid(true)}
          checked={confirmedPaid || isCheckingIn}
          disabled={confirmedPaid || isCheckingIn}
          label={`I confirm that ${fullName} has paid the total amount of ${wantBreakfast
            ? `${formatCurrency(totalPrice + extrasPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(
              extrasPrice
            )})`
            : formatCurrency(totalPrice)
            }`}
          id={id}
        />

        <Buttons>
          <Button disabled={!confirmedPaid || isCheckingIn} onClick={handleCheckIn}>
            {isCheckingIn ? "Checking" : `Check in booking #${id}`}
          </Button>
          <Button $variation="backV2" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Buttons>
      </Row>
    </>
  );
}
