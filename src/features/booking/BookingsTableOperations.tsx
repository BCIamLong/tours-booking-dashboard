import styled from "styled-components";
import { Filter } from "~/components/Filter";
import SortBy from "~/components/SortBy";

const StyledOperations = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export default function BookingsTableOperations() {
  return (
    <StyledOperations>
      <Filter
        filterField="filter"
        options={[
          { value: "all", label: "All" },
          { value: "checked-in", label: "Checked in" },
          { value: "checked-out", label: "Checked out" },
          { value: "confirmed", label: "Confirmed" },
          // { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
      <SortBy
        options={[
          { value: "none", label: "Sort" },
          { value: "latest", label: "Sort by date (recent first)" },
          { value: "oldest", label: "Sort by date (earlier first)" },
          { value: "price-low", label: "Sort by amount (low first)" },
          { value: "price-high", label: "Sort by amount (high first)" },
        ]}
      />
    </StyledOperations>
  );
}
