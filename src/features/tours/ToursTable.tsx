import Table from "~/components/Table";
import Spinner from "~/components/Spinner";
import Menu from "~/components/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "~/components/Empty";
import { useTours } from "./useTours";
import { FilterOptions, SortOptions, Tour } from "~/types";
import TourItem from "./ToursItem";
import Pagination from "~/components/Pagination";

function ToursTable() {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "none";
  const filter = searchParams.get("filter") || "none";

  const { tours, error, isLoading, count } = useTours({ sort: sort as SortOptions, filter: filter as FilterOptions });


  if (isLoading) return <Spinner />;

  if (error) return;
  if (!tours?.length) return <Empty resourceName="tours" />;

  return (
    <Menu>
      <Table columns="1fr 2.4fr 2fr 1.2fr 1fr 0.6fr">
        <Table.Header>
          <div></div>
          <div>Tour</div>
          <div>Group Size</div>
          <div>Price</div>
          <div>Type</div>
          <div></div>
        </Table.Header>

        <Table.Body<Tour>
          data={tours as Tour[]}
          render={(tour) => <TourItem tour={tour} key={tour._id} />}
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

export default ToursTable;
