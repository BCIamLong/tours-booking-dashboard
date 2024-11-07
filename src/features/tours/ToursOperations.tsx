import styled from "styled-components";
import { Filter } from "~/components/Filter";
import SortBy from "~/components/SortBy";

const StyledOperations = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export default function ToursOperations() {
  return (
    <StyledOperations>
      <Filter
        filterField="filter"
        options={[
          { value: "none", label: "All" },
          { value: "group", label: "Group" },
          { value: "private", label: "Private" },
          { value: "personal", label: "Personal" },
        ]}
      />
      <SortBy
        options={[
          { value: "none", label: "Sort" },
          { value: "name-high", label: "Sort by name (A-Z)" },
          { value: "name-low", label: "Sort by name (Z-A)" },
          { value: "price-high", label: "Sort by price (low first)" },
          { value: "price-low", label: "Sort by price (hight first)" },
          { value: "latest", label: "Sort by time (newest)" },
          { value: "oldest", label: "Sort by time (oldest)" },
        ]}
      />
    </StyledOperations>
  );
}
