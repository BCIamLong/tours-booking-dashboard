import Spinner from "~/components/Spinner";
// import { useRecentBookings } from "./useRecentBookings";
import { useRecentBookings } from "../booking/useRecentBookings";
import styled from "styled-components";
import { useRecentStays } from "../booking/useRecentStays";
// import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
// import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationsChart from "./DurationsChart";
import TodayActivities from "../check-in-out/TodayActivities";
import { Booking } from "~/types/booking.type";
import { useTours } from "../tours/useTours";

const StyledDashboardBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1.2fr 1.4fr;
  column-gap: 2rem;
  row-gap: 2.4rem;
`;

export default function DashboardBox() {
  const { isLoading: isLoading1, bookings } = useRecentBookings();
  const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays();
  const { isLoading: isLoading3, tours } = useTours({ sort: 'none', filter: 'none' });
  console.log(isLoading1, isLoading2, isLoading3);

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardBox>
      <Stats
        bookings={bookings as Partial<Booking>[]}
        confirmedStays={confirmedStays as Partial<Booking>[]}
        numDays={numDays}
        numCabins={tours?.length || 0}
      />
      <TodayActivities />
      <DurationsChart confirmedStays={confirmedStays as Booking[]} />
      <SalesChart bookings={bookings as Booking[]} numDays={numDays} />
    </StyledDashboardBox>
  );
}
