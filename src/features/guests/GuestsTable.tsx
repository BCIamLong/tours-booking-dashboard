import Table from "~/components/Table";
import Spinner from "~/components/Spinner";
import Menu from "~/components/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "~/components/Empty";
import { FilterGuestOptions, Guest, SortOptions } from "~/types";
import { useGuests } from "./useGuests";
import GuestsItem from "./GuestsItem";
import Pagination from "~/components/Pagination";

function GuestsTable() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "none";
  const filter = searchParams.get("filter") || "none";

  const { guests, error, isLoading, count } = useGuests({ sort: sort as SortOptions, filter: filter as FilterGuestOptions });
  console.log(guests, count)

  if (isLoading) return <Spinner />;

  if (error) return;
  if (!guests?.length) return <Empty resourceName="guests" />;

  return (
    <Menu>
      <Table columns="1.1fr 1.5fr 2.4fr 1.4fr 1.2fr 0.5fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>Email</div>
          <div>Verify Email</div>
          <div>Enable 2FA</div>
          <div></div>
        </Table.Header>

        <Table.Body<Guest>
          data={guests as Guest[]}
          render={(guest) => <GuestsItem guest={guest} key={guest._id} />}
        />
        {/* <Table.Body data={cabinsFiltered} render={(cabin) => <CabinItem cabin={cabin} key={cabin.id} />} /> */}
        {/* <Table.Body data={cabins} render={(cabin) => <CabinItem cabin={cabin} key={cabin.id} />} /> */}

        {/* {cabins?.map()} */}
        <Table.Footer>
          <Pagination count={count || 0} />
        </Table.Footer>
      </Table>
    </Menu>
  );
}

export default GuestsTable;
