import Table from "~/components/Table";
import { useBookings } from "./useBookings";
import Spinner from "~/components/Spinner";
import BookingRow from "./BookingRow";
import { Booking } from "~/types/booking.type";
import Pagination from "~/components/Pagination";
import Menus from "~/components/Menus";
import Empty from "~/components/Empty";
import { useSearchParams } from "react-router-dom";
// import { useSearchBookings } from "./userSearchBookings";
// import { useSearchParams } from "react-router-dom";

export default function BookingsTable() {
  // const [searchParams] = useSearchParams();
  // const filter = searchParams.get("filter") || "";
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  // const { bookings: bookingsSearch, isSearching } = useSearchBookings(query);

  const { isLoading, bookings, count } = useBookings({ sort: 'none', filter: 'none' });

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.3fr 2.4fr 2.6fr 2.5fr 2fr 1.5fr 0.3fr">
        <Table.Header>
          <div></div>
          <div>Tour</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        {/* {bookingsSearch?.length ? (
          <Table.Body<Booking>
            data={bookingsSearch}
            render={(booking) => <BookingRow key={booking.id} booking={booking} />}
          />
        ) : ( */}
        <Table.Body<Booking>
          data={bookings}
          render={(booking) => <BookingRow key={booking._id} booking={booking} />}
        />
        {/* )} */}

        {/* <Table.Body<Booking> data={bookings} render={(booking) => <BookingRow key={booking.id} booking={booking} />} /> */}
        <Table.Footer>
          <Pagination count={count || 0} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
